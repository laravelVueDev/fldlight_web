<template>
  <section class="app-home">
    <div class="container container-fluid">
      <h1 class="greeting display2">{{ greeting }}, {{ name }}</h1>
      <div class="line"></div>
      <div class="row">
        <div class="col-lg-9">
          <div class="thanks" v-if="planLabel !== undefined">
            <p>
              Thank you for updating your account with Floodlight.<br />
              Your {{ planLabel }} subscription grants you unlimited access to
              Floodlight's values-based investing platform.
            </p>
            <h4 class="text-italic">Hold the Standard</h4>
          </div>
          <DataExplanation />
        </div>
        <div class="col-lg-3">
          <div class="recent-searches">
            <h2 class="recent-searches__title">Recent Searches</h2>
            <ul class="recent-searches__list">
              <li
                class="recent-searches__item"
                v-for="(search, i) in recentSearches"
                v-bind:key="i"
              >
                <router-link
                  :to="{
                    name: 'company',
                    params: { ticker: `${search.ticker}` }
                  }"
                >
                  {{ search.name }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <TopContributors />
      <div class="attribution">
        <p>
          Data is sourced from the US
          <a href="https://www.fec.gov">Federal Election Commission</a> and
          other government agencies. The Federal Election Commission (FEC) is
          the independent regulatory agency charged with administering and
          enforcing the federal campaign finance law. The FEC has jurisdiction
          over the financing of campaigns for the U.S. House, Senate, Presidency
          and the Vice Presidency.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { getInstance } from "@/auth/auth.js";
import { mapGetters } from "vuex";
import TopContributors from "./TopContributors";
import DataExplanation from "@/components/DataExplanation";
import selectn from "selectn";

export default {
  name: "ApplicationHome",
  components: {
    TopContributors,
    DataExplanation
  },
  data() {
    return {
      authService: undefined,
      name: undefined,
      planLabel: undefined
    };
  },
  computed: {
    ...mapGetters(["recentSearches", "subscriptionActivated", "subscription"]),
    greeting() {
      let hour = new Date().getHours();
      return (
        "Good " + (hour < 12 ? "Morning" : hour < 18 ? "Afternoon" : "Evening")
      );
    }
  },
  mounted: async function() {
    this.authService = getInstance();
    this.name = this.authService.getUserMetadata().first_name;

    const isFirstLogin = this.authService.getLoginCount() === 1;
    const subscriptionId = selectn(
      "subscription.id",
      this.$auth.getAppMetadata()
    );

    if (!this.subscriptionActivated && isFirstLogin && subscriptionId) {
      this.$router.push({ path: `/subscriptions/${subscriptionId}/edit` });
    }

    const planLabels = {
      monthly: "monthly",
      annual: "annual"
    };

    if (this.$route.query.upgraded) {
      const label = this.$route.query.upgraded.toLowerCase();
      this.planLabel = planLabels[label];
    }
  }
};
</script>

<style lang="scss" scoped>
.app-home {
  padding: 4rem 0 8rem;
}

.line {
  height: $decorative-line-size;
  width: 80%;
  background-color: $decorative-line-color;
  margin-left: -50%;
  margin-bottom: 2rem;
}

.thanks {
  background-color: $nord6;
  padding: 1em;
}

.greeting {
  color: $primary;
}

.recent-searches {
  max-width: 20rem;
  margin: 0 auto;

  &__title {
    padding-bottom: 0.25rem;
    border-bottom: 1px solid $gray8;
    margin-bottom: 1rem;
  }

  &__list {
    text-align: left;
    display: flex;
    flex-direction: column-reverse;
    line-height: 1.7;
  }
}

.attribution {
  font-size: 0.8em;
  margin-bottom: 5rem;
}
</style>
