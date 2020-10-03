<template>
  <div class="committee-funding">
    <h2>Committee Funding Sources</h2>
    <transition name="fade">
      <div v-if="!updating && dataLoaded">
        <p v-if="corporateStats.total > 0 || committeeStats.total > 0">
          {{ displayName }} received
          <span v-if="corporateStats.total > 0">
            <span class="number dollars">
              {{ format(corporateStats.total, "currencyMax2", "short") }}
            </span>
            in funding from
            <span class="number">
              {{ format(corporateStats.count, "integer") }}
            </span>
            corporate donor{{ corporateStats.count > 1 ? "s" : ""
            }}{{ committeeStats.total > 0 ? ", in addition to" : "" }}
          </span>
          <span v-if="committeeStats.total > 0">
            <span class="number dollars">
              {{ format(committeeStats.total, "currencyMax2", "short") }}
            </span>
            in funding from
            <span class="number">
              {{ format(committeeStats.count, "integer") }}
            </span>
            other political committee{{ committeeStats.count > 1 ? "s" : "" }}
          </span>
          {{ timeframeItem.desc }}.
        </p>
        <p v-else>
          {{ displayName }} did not receive any funding from corporations or
          other political committees {{ timeframeItem.desc }}.
        </p>
      </div>
    </transition>

    <CommitteeFundingCompanies
      v-bind:timeframe-item="timeframeItem"
      v-bind:committee_id="committee_id"
    />
  </div>
</template>

<script>
import format from "@/utils/number-format.js";
import { mapGetters } from "vuex";
import { getInstance } from "../../auth/auth";
import CommitteeFundingCompanies from "./CommitteeFundingCompanies.vue";
import sampleData from "../../fixtures/committeeFunding";
import selectn from "selectn";

export default {
  name: "CommitteeFunding",
  components: {
    CommitteeFundingCompanies
  },
  props: {
    committee_id: String,
    displayName: String,
    timeframeItem: Object
  },
  data() {
    return {
      updating: true,
      dataLoaded: false,
      committeeStats: null,
      corporateStats: null,
      authService: undefined
    };
  },
  watch: {
    timeframeItem() {
      this.getData();
    },
    $route() {
      // is this even necessary?
      this.getData();
    }
  },
  mounted: function() {
    this.authService = getInstance();
  },
  computed: {
    ...mapGetters(["subscription"]),
    isPaid() {
      const paidPlanNames = ["monthly", "annual"];
      // auth0 access token can fall behind. Look first at local store for correct value
      const localStorePlan = selectn("plan.nickname", this.subscription);
      const sessionPlan = selectn(
        "subscription.plan.nickname",
        this.authService.getAppMetadata()
      );

      const planNickname = localStorePlan || sessionPlan;

      if (!planNickname) {
        return false;
      }

      return paidPlanNames.includes(planNickname.toLowerCase());
    }
  },
  methods: {
    format(...args) {
      return format(...args);
    },
    async getData() {
      this.updating = true;
      const url = `/committee/funding/${this.committee_id}/${this.timeframeItem.start}/${this.timeframeItem.end}/`;

      if (!this.isPaid) {
        this.committeeStats = sampleData.committees;
        this.corporateStats = sampleData.corporates;
        this.dataLoaded = true;
        this.updating = false;
        return;
      }

      try {
        const response = await this.$http.get(url);

        this.committeeStats = response.data.committees;
        this.corporateStats = response.data.corporates;
        this.dataLoaded = true;
        this.updating = false;
      } catch (e) {
        // do nuthin?
        console.warn(e);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.committee-funding {
  width: 55%;
}
.number {
  font-weight: 500;
}
</style>
