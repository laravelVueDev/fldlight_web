<template>
  <div class="company">
    <div class="container container-fluid">
      <transition name="fade">
        <div v-show="!updating">
          <div class="content-header">
            <h1>
              {{ company.name }}<span class="ticker">{{ company.ticker }}</span>
            </h1>
            <Timeframe v-on:timeframe="timeframe" />
          </div>
          <CompanyStats
            v-bind:timeframe-item="timeframeItem"
            v-bind:company="company"
            v-bind:stats="stats"
          />

          <CompanyTimeseries
            v-if="years.length"
            :company="company"
            :years="years"
          />
          <isPaidCheck>
            <CompanyCommittees
              v-bind:timeframe-item="timeframeItem"
              v-bind:company="company"
            />
          </isPaidCheck>
          <isPaidCheck>
            <CompanyEmployees
              v-bind:timeframe-item="timeframeItem"
              v-bind:company="company"
            />
          </isPaidCheck>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Timeframe from "@/components/Timeframe.vue";
import CompanyStats from "./CompanyStats.vue";
import CompanyTimeseries from "./CompanyTimeseries.vue";
import CompanyCommittees from "./CompanyCommittees.vue";
import CompanyEmployees from "./CompanyEmployees.vue";
import isPaidCheck from "@/components/isPaidCheck";

export default {
  name: "Company",
  components: {
    Timeframe,
    CompanyStats,
    CompanyTimeseries,
    CompanyCommittees,
    CompanyEmployees,
    isPaidCheck
  },
  data() {
    return {
      updating: true,
      company: {},
      timeframeItem: null,
      stats: {
        employeeCount: null,
        contributions: []
      },
      years: []
    };
  },
  watch: {
    $route() {
      this.getData();
    }
  },
  methods: {
    timeframe(item) {
      this.timeframeItem = item;
      this.$ga.event("company", "timeframe", item.label);
      this.$emit("timeframe", item);
      this.getData();
    },
    async getData() {
      // TODO: should each component handle it's own fetch? or have one "smart" component and all children just handle display?
      this.updating = true;
      this.company = {};
      const statsURL = `/company/stats/${this.$route.params.ticker}/${this.timeframeItem.start}/${this.timeframeItem.end}/`;

      // stats Data
      try {
        const response = await this.$http.get(statsURL);

        this.stats = response.data.politics.contributions;

        this.company = {
          ticker: response.data.ticker,
          name: response.data.name,
          sector: response.data.sector,
          industry: response.data.industry
        };

        this.years = response.data.politics.contributions.years;
        this.updating = false;
      } catch (e) {
        // do nuthin?
        console.warn(e);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.company {
  padding-top: 4rem;
  min-height: 100vh;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    margin: 0;
    max-width: 600px;
  }
}

.ticker {
  color: $nord9;
  font-weight: 300;
  margin-top: 6px;
  font-size: 24px;
  margin-left: 10px;
}
</style>
