<template lang="html">
  <div class="stripe-card">
    <div>
      <p class="text-center">
        Please complete the payment form below to establish access to
        Floodlight.
      </p>
      <div>
        <p class="stripeError" v-if="stripeError">
          {{ stripeError }}
        </p>
      </div>
      <form id="payment-form">
        <div class="row">
          <div class="col-xs-12">
            <label for="fullName">
              Name on card
              <span class="form-danger">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              v-model="fullName"
              ref="fullName"
              required
            />
            <span class="help-block form-danger" v-if="fullNameError">
              {{ fullNameError }}
            </span>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-6">
            <label for="phone">Phone</label>
            <input
              type="tel"
              placeholder="888-888-8888"
              maxlength="12"
              id="phone"
              name="phone"
              v-model="phone"
              ref="phone"
            />
          </div>
          <div class="col-xs-6">
            <label for="company">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              :v-model="company"
              ref="company"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12">
            <label for="stripe-card-number">
              Card number
              <span class="form-danger">*</span>
            </label>
            <div id="stripe-card-number" ref="cardNumber"></div>
            <span class="help-block form-danger" v-if="cardNumberError">
              {{ cardNumberError }}
            </span>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-6">
            <label for="stripe-card-expiry">
              Exp
              <span class="form-danger">*</span>
            </label>
            <div id="stripe-card-expiry" ref="cardExp"></div>
            <span class="help-block form-danger" v-if="cardExpError">
              {{ cardExpError }}
            </span>
          </div>
          <div class="col-xs-6">
            <label for="stripe-card-cvc">
              CVC
              <span class="form-danger">*</span>
            </label>
            <div id="stripe-card-cvc" ref="cardCvc"></div>
            <span class="help-block form-danger" v-if="cardCvcError">
              {{ cardCvcError }}
            </span>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 text-center">
            <input
              class="btn btn-primary"
              type="submit"
              value="Complete Payment"
              @click.prevent="submitForm"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12">
            <div id="card-element">
              <!-- A Stripe Element will be inserted here. -->
            </div>
            <div v-show="errors">
              <br />
              <ol class="errors text-danger">
                <li v-for="(error, index) in errors" :key="index">
                  {{ error }}
                </li>
              </ol>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="js">
import { mapMutations } from "vuex";
const stripe = window.Stripe(process.env.VUE_APP_STRIPE_API_KEY);
const elements = stripe.elements();

export default {
  name: 'stripe-card',
  props: {
    customerId: String,
    subscriptionId: String,
    productName: String,
    productId: String,
    planName: String,
    planId: String,
    email: String,
  },
  data() {
    return {
      card: {
        number: '',
        cvc: '',
        exp: '',
      },
      //elements
      cardNumber: '',
      cardExp: '',
      cardCvc: '',

      // errors
      fullNameError: '',
      stripeError: '',
      cardCvcError: '',
      cardExpError: '',
      cardNumberError: '',

      fullName: '',
      phone: '',
      company: '',

      errors: []
    }
  },
  mounted: function () {
    const userData = this.$auth.getUserMetadata();
    this.fullName = `${userData['first_name']} ${userData['last_name']}`;
    this.mountFormFields();
  },
  beforeDestroy() {
    this.cardNumber.destroy(this.$refs.cardNumber);
    this.cardExp.destroy(this.$refs.cardExp);
    this.cardCvc.destroy(this.$refs.cardCvc);
  },
  methods: {
    ...mapMutations(["setSelectedPlan", "setCompany", "setSubscription"]),

    clearCardErrors() {
      this.fullNameError = '';
      this.stripeError = '';
      this.cardCvcError = '';
      this.cardExpError = '';
      this.cardNumberError = '';
    },

    submitForm() {
      this.clearCardErrors();
      let valid = true;

      if (!this.fullName) {
        valid = false;
        this.fullNameError = "Name is Required";
        return;
      }
      if (!this.card.number) {
        valid = false;
        this.cardNumberError = "Card Number is Required";
        return;
      }
      if (!this.card.exp) {
        valid = false;
        this.cardExpError = "Expiration is Required";
        return;
      }
      if (!this.card.cvc) {
        valid = false;
        this.cardCvcError = "CVC is Required";
        return;
      }
      if (this.stripeError) {
        valid = false;
      }
      if (valid) {
        this.processPayment();
      } else {
        this.$forceUpdate();
      }
    },

    async processPayment() {
      const paymentMethodRequest = await this.createPaymentMethod();

      if (paymentMethodRequest.error) {
        console.error(paymentMethodRequest.error.message);

      } else {
        const subscriptionRequest = await this.updateSubscription(paymentMethodRequest['paymentMethod']['id']);

        if (paymentMethodRequest.error) {
          console.error(paymentMethodRequest.error.message);

        } else {
          this.setCompany(this.company);
          this.setSubscription(subscriptionRequest.data.data);
          this.$emit('subscription-updated', subscriptionRequest);
        }
      }
    },

    createPaymentMethod(){
      const billingDetails = {};

      if (this.fullName){
        billingDetails.name = this.fullName;
      }

      if (this.phone){
        billingDetails.phone = this.phone;
      }

      return stripe.createPaymentMethod({
        type: 'card',
        card: this.cardNumber,
        billing_details: billingDetails,
      });
    },

    updateSubscription(paymentMethodId){
      const payload = {
        name: this.fullName,
        email: this.$props.email,
        phone: this.phone,
        company: this.company,
        customerId: this.$props.customerId,
        newPlanId: this.$props.planId,
        paymentMethodId: paymentMethodId,
        existingSubscriptionId: this.$props.subscriptionId
      };

      return this.$http.put('/subscriptions', payload);
    },

    mountFormFields(){
      this.cardNumber = elements.create('cardNumber');
      this.cardNumber.mount(this.$refs.cardNumber);

      this.cardExp = elements.create('cardExpiry');
      this.cardExp.mount(this.$refs.cardExp);

      this.cardCvc = elements.create('cardCvc');
      this.cardCvc.mount(this.$refs.cardCvc);

      const company = document.getElementById('company');
      const self = this;
      company.addEventListener('change', function (event) {
        self.company = event.target.value;
      });

      this.listenForErrors();
    },

    listenForErrors: function () {
      const self = this;

      const fullNameEl = document.getElementById('fullName');
      fullNameEl.addEventListener('change', function (event) {

        if (event.target.value === ''){
          self.fullNameError = "Name is Required";
        } else {
          self.fullNameError = '';
        }
      });


      this.cardNumber.addEventListener('change', function (event) {
        self.toggleError(event);
        self.cardNumberError = '';
        self.card.number = !!event.complete
      });

      this.cardExp.addEventListener('change', function (event) {
        self.toggleError(event);
        self.cardExpError = '';
        self.card.exp = !!event.complete
      });

      this.cardCvc.addEventListener('change', function (event) {
        self.toggleError(event);
        self.cardCvcError = '';
        self.card.cvc = !!event.complete
      });
    },

    toggleError: function (event) {
      if (event.error) {
        this.stripeError = event.error.message;
      } else {
        this.stripeError = '';
      }
    },
  },
}
</script>

<style scoped lang="scss">
.stripe-card {
  @import "../../assets/styles/variables";

  margin-bottom: 2em;

  .StripeElement {
    line-height: 1.2em;
    width: 100%;
    font-size: 0.9rem;
    padding: 0.6em;
    margin: 0.5em 0 1.8em 0;
    border: none;
    border-radius: 2px;
    box-shadow: 0 1px 3px 0 $gray3;
  }

  .StripeElement--focus {
    box-shadow: 0 1px 3px 0 $gray2;
  }

  .StripeElement--invalid {
    border-color: $red;
  }

  .btn {
    max-width: 200px;
  }

  .stripeError,
  .text-danger,
  .form-danger {
    color: $red;
  }
}
</style>
