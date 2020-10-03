<template lang="html">
  <section class="pricing">
    <div class="container container-fluid">
      <h1 class="display2">Pricing</h1>
      <div class="row">
        <div class="col-xs-12">
          <table>
            <tr>
              <td>&nbsp;</td>
              <td class="center"><h5>Limited</h5></td>
              <td class="center"><h5>Premium</h5></td>
              <td class="center"><h5>Premium</h5></td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td class="center">Free</td>
              <td class="center">{{ monthlyPlan.priceFormatted }}/month</td>
              <td class="center">{{ annualPlan.priceFormatted }}/year</td>
            </tr>
            <tr class="header">
              <td><strong>Features</strong></td>
              <td class="center">
                <router-link
                  :to="{
                    name: 'applicationhome'
                  }"
                >
                  <button class="btn btn--secondary">
                    Continue with current plan
                  </button>
                </router-link>
              </td>
              <td class="center">
                <button
                  v-bind:key="monthlyPlan.id"
                  @click="setSelectedPlan(monthlyPlan)"
                  class="btn btn--primary"
                >
                  Upgrade
                </button>
              </td>
              <td class="center">
                <button
                  v-bind:key="annualPlan.id"
                  @click="setSelectedPlan(annualPlan)"
                  class="btn btn--primary"
                >
                  Upgrade
                </button>
              </td>
            </tr>
            <tr v-for="feature in features" v-bind:key="feature.label">
              <td>{{ feature.label }}</td>
              <td class="center">
                {{
                  feature.plans.includes(planConstants.LIMITED) ? "&check;" : ""
                }}
              </td>
              <td class="center">
                {{
                  feature.plans.includes(planConstants.MONTHLY) ? "&check;" : ""
                }}
              </td>
              <td class="center">
                {{
                  feature.plans.includes(planConstants.ANNUAL) ? "&check;" : ""
                }}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="js">
import format from "../utils/number-format.js";
import { mapMutations } from "vuex";

const moneyIntegerToDecimal = (amount) => amount * .01;

const transformPlanData = function (plans) {
  return plans.map(plan => {
    plan.priceFormatted = format(moneyIntegerToDecimal(plan.amount), "currency");
    return plan;
  });
};

const getPlanByName = function(plans, name) {
  return plans.find(plan => plan.name === name);
};

const planConstants = {
  LIMITED: 'limited',
  MONTHLY: 'monthly',
  ANNUAL: 'annual'
};

export default {
  name: 'pricing',
  data() {
    return {
      plans: [],
      annualPlan: {},
      monthlyPlan: {},
      planConstants: planConstants,
      features: [
        {label: 'Political spend of S&P 500', plans: [planConstants.LIMITED, planConstants.MONTHLY, planConstants.ANNUAL]},
        {label: 'Political spend of ETF holdings', plans: [planConstants.LIMITED, planConstants.MONTHLY, planConstants.ANNUAL]},
        {label: 'Political spend of Index holdings', plans: [planConstants.LIMITED, planConstants.MONTHLY, planConstants.ANNUAL]},
        {label: 'Political affiliation of S&P 500', plans: [planConstants.MONTHLY, planConstants.ANNUAL]},
        {label: 'Political affiliation of ETF holdings', plans: [planConstants.MONTHLY, planConstants.ANNUAL]},
        {label: 'Political affiliation of Index holdings', plans: [planConstants.MONTHLY, planConstants.ANNUAL]},
        {label: 'PAC affiliation of S&P 500', plans: [planConstants.MONTHLY, planConstants.ANNUAL]},
        {label: 'PAC affiliation of ETF holdings', plans: [planConstants.MONTHLY, planConstants.ANNUAL]},
        {label: 'PAC affiliation of Index holdings', plans: [planConstants.MONTHLY, planConstants.ANNUAL]},
        {label: 'Client Discovery Tool', plans: [planConstants.MONTHLY, planConstants.ANNUAL]},
        {label: 'Values Assessment Tool', plans: [planConstants.MONTHLY, planConstants.ANNUAL]},
        {label: 'Search/filter on total political spend', plans: [planConstants.MONTHLY, planConstants.ANNUAL]},
        {label: 'Spend based on party affiliation', plans: [planConstants.MONTHLY, planConstants.ANNUAL]},
        {label: 'Spend based on PAC', plans: [planConstants.MONTHLY, planConstants.ANNUAL]},
        {label: 'Spend based on year', plans: [planConstants.MONTHLY, planConstants.ANNUAL]},
        {label: 'Spend based on election cycle', plans: [planConstants.MONTHLY, planConstants.ANNUAL]},
      ],
    }
  },
  created: async function () {
    const plansResponse = await this.$http.get('/plans');
    this.plans = transformPlanData(plansResponse.data.data);
    this.annualPlan = getPlanByName(this.plans, 'Annual');
    this.monthlyPlan = getPlanByName(this.plans, 'Monthly');
  },
  methods: {
    ...mapMutations(["setSelectedPlan"])
  }
}
</script>

<style scoped lang="scss">
.pricing {
  @import "../assets/styles/variables";

  margin: 2rem 0 4rem;

  .display2 {
    text-align: center;
  }

  table {
    margin: 2em auto;
    min-width: 800px;
    padding: 4rem 2rem;

    td {
      padding: 0.8em 0;
    }

    tr.header {
      border-bottom: 1px solid $gray3;
    }
  }
}
</style>
