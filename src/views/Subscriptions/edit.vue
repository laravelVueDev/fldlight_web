<template lang="html">
  <section class="payment">
    <div class="container container-fluid">
      <h1 class="display2">Select your subscription type</h1>
      <div class="row row-tiers">
        <div class="col-md-3" :key="plan.id" v-for="plan in plans">
          <SelectableCard
            :id="plan.id"
            :title="plan.name"
            :content="plan.description"
            :summary="plan.priceFormatted"
            :selected="plan.selected"
            @selectable-card-selected="selectPlan"
            :isCurrentPlan="plan.current"
          ></SelectableCard>
        </div>
      </div>
      <div class="content">
        <div class="line"></div>
        <div class="row">
          <div class="col-md-6 col-md-offset-3">
            <SubscriptionChange
              v-show="displaySubscriptionChange"
              :existingSubscriptionId="subscriptionId"
              :newPlanId="selectedPlanId()"
              @subscription-updated="handleSubscriptionChanged"
            />
            <StripeCard
              v-show="displayStripeCardForm"
              :productId="selectedProductId()"
              :productName="selectedProductName()"
              :planId="selectedPlanId()"
              :planName="selectedPlanName()"
              :email="email"
              :customerId="customerId"
              :subscriptionId="subscriptionId"
              @subscription-updated="handleSubscriptionChanged"
            />
            <ContactForm v-show="displayContactForm" />
            <div v-show="displayFreeTierText" class="text-center">
              <h4 class="text-italic">Hold the Standard</h4>
              <p>
                A free subscription grants you limited access to Floodlight's
                values-based investing platform. Help us with feedback, and
                we'll help you with actionable, insight-rich data.
              </p>
              <button class="btn btn--primary" @click="onSelectFreePlan">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="js">
import { getInstance } from "@/auth/auth.js";
import {mapGetters, mapMutations} from "vuex";
import format from "../../utils/number-format.js";
import selectn from "selectn";
import StripeCard from "./StripeCard";
import SelectableCard from "./SelectableCard";
import ContactForm from "./ContactForm";
import SubscriptionChange from "./SubscriptionChange";
import plans from "./plans";

const moneyIntegerToDecimal = (amount) => {
  if (undefined === amount || amount === null || amount === "") {
    return "";
  }
  return amount * .01;
};

export default {
  name: 'payment',
  components: {
    SubscriptionChange,
    ContactForm,
    SelectableCard,
    StripeCard
  },
  data() {
    return {
      authService: undefined,
      email: '',
      fullName: '',
      currentPlan: undefined,
      displayFreeTierText: false,
      displayContactForm: false,
      displayStripeCardForm: false,
      displaySubscriptionChange: false,
      plans: plans,
      customerId: undefined,
      subscriptionId: undefined
    }
  },
  computed: {
    ...mapGetters(["subscription"]),
  },
  methods: {
    ...mapMutations(["setSubscriptionActivated", "setSubscription"]),

    isCurrentPlan(plan){
      return plan.name === this.currentPlan;
    },
    currentPlanIsPaid(){
      return this.currentPlan !== 'Free';
    },
    shouldShowStripeCardForm(plan){
      return plan.selected
              && !this.isCurrentPlan(plan)
              && this.isPaidPlan(plan)
              && !this.currentPlanIsPaid();
    },
    shouldShowSubscriptionChangeForm(plan){
      return plan.selected
              && !this.isCurrentPlan(plan)
              && this.isPaidPlan(plan)
              && this.currentPlanIsPaid();
    },
    selectPlan(plan_id) {
      this.displayStripeCardForm = false;

      this.plans.forEach(plan => {
        if (plan.id === plan_id){
          plan.selected = true;
          this.displayStripeCardForm = this.shouldShowStripeCardForm(plan);
          this.displaySubscriptionChange = this.shouldShowSubscriptionChangeForm(plan);
          this.displayFreeTierText = plan.name === "Free";
          this.displayContactForm = plan.name === "Data License";
        } else {
          plan.selected = false;
        }
      });
    },

    isPaidPlan: (plan) => plan.amount && plan.amount > 0,

    selectedPlan(){
      return this.plans.find(plan => plan.selected === true);
    },

    selectedPlanName(){
      return this.selectedPlan() && this.selectedPlan().name;
    },

    selectedPlanId(){
      return this.selectedPlan() && this.selectedPlan().id;
    },

    selectedProductId(){
      return this.selectedPlan() && this.selectedPlan().product_id;
    },

    selectedProductName(){
      return this.selectedPlan() && this.selectedPlan().product_name;
    },

    async handleSubscriptionChanged(){
      this.setSubscriptionActivated(true);
      await this.authService.getTokenSilently();
      const nickname = selectn('plan.nickname', this.subscription) || this.authService.getAppMetadata().subscription.plan.nickname;

      this.$router.push({
        path: '/home',
        force: true,
        query: {upgraded: nickname}
      }).catch(err => err);
    },

    async onSelectFreePlan(){
      this.setSubscriptionActivated(true);
      const existingPlanId = selectn("subscription.plan.id", this.authService.getAppMetadata());

      console.log('existingPlanId',existingPlanId);
      console.log('selectedPlanId',this.selectedPlan().id);
      console.log('selectedPlan',this.selectedPlan());
      console.log('AppMetadata',this.authService.getAppMetadata());

      if (existingPlanId !== this.selectedPlan().id) {
        this.handleDowngrade();

      } else {
        this.$router.push({
          path: '/home',
        }).catch(err => err);
      }
    },

    handleDowngrade(){
      const appMetadata = this.authService.getAppMetadata();
      const existingSubscriptionId = this.subscription.id || appMetadata.subscription.id;
      const params = {
        newPlanId: this.selectedPlan().id,
        customerId: this.customerId,
      };

      this.$router.push({
        name: 'subscriptions-downgrade',
        params: {
          subscriptionId: existingSubscriptionId
        },
        query: params
      });
    },

    // merges stripe plan data with display text attributes defined here
    transformPlanData(stripePlans) {
      return this.plans.map(plan => {
        const stripePlan = stripePlans.find(p => p.name === plan.name) || {};
        const current = this.currentPlan === plan.name;
        const price = stripePlan.amount;

        return Object.assign(plan,{
          ...stripePlan,
          selected: current,
          current: current,
          priceFormatted: format(moneyIntegerToDecimal(price), "currency")
        });
      });
    },
  },
  created: async function() {
    this.authService = getInstance();
    const userData = this.authService.getUserMetadata();
    const appMetadata = this.authService.getAppMetadata();

    this.email = this.authService.user.email;
    this.fullName = `${userData['first_name']} ${userData['last_name']}`;
    this.currentPlan = selectn('plan.nickname', this.subscription) || selectn('subscription.plan.nickname', appMetadata);
    this.customerId = appMetadata["stripe_customer_id"];
    this.subscriptionId = this.subscription.id || selectn('subscription.id', appMetadata);

    const plansResponse = await this.$http.get('/plans');
    this.plans = this.transformPlanData(plansResponse.data.data);
    this.displayFreeTierText = !this.currentPlanIsPaid();
  }
}
</script>

<style scoped lang="scss">
.payment {
  margin: 4rem 0 10rem;

  .display2 {
    text-align: center;
    margin-bottom: 3rem;
  }

  .row-tiers {
    justify-content: center;
  }

  .line {
    height: $decorative-line-size;
    background-color: $decorative-line-color;
    width: 20%;
    margin: 4rem auto 3rem;
  }
}
</style>
