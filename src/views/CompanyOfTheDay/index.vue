<template>
  <div class="company-of-the-day">
    <div class="container container-fluid container-padded">
      <h1 class="display2 text-center">Company of the Day</h1>
      <div class="row">
        <div class="data-explanation-container">
          <DataExplanation />
        </div>
        <div class="line"></div>
        <div class="company-of-the-day__title">
          <h1>{{ companyOfTheDay.name }}</h1>
        </div>
        <CompanyStats
          v-bind:timeframe-item="this.timeframeItem"
          v-bind:company="companyOfTheDay"
          v-bind:stats="companyOfTheDay.politics.contributions"
        />

        <CompanyTimeseries
          v-if="companyOfTheDay.politics.contributions.years.length"
          :company="companyOfTheDay"
          :years="companyOfTheDay.politics.contributions.years"
          :key="companyOfTheDay.politics.contributions.years.length"
        />
      </div>
    </div>
    <Close />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import DataExplanation from "@/components/DataExplanation";
import CompanyStats from "@/views/CompanyDetail/CompanyStats";
import CompanyTimeseries from "@/views/CompanyDetail/CompanyTimeseries";
import Close from "./Close";

export default {
  name: "CompanyOfTheDay",
  components: {
    CompanyStats,
    CompanyTimeseries,
    DataExplanation,
    Close
  },
  data() {
    return {
      company: {},
      // TODO: This should be coming from the server
      // Rethink timeframe for the application put into state?
      timeframeItem: {
        active: true,
        desc: "over the last 12 years",
        end: 2019,
        label: "12 years",
        start: 2007,
        type: "recent"
      },
      stats: {
        employeeCount: null,
        contributions: []
      }
    };
  },
  computed: {
    ...mapGetters(["companyOfTheDay"])
  }
};
</script>

<style lang="scss" scoped>
.company-of-the-day {
  padding-top: 100px;
  @include breakpoint($mobile-down) {
    padding-top: 60px;
  }
}
.company-of-the-day__title {
  width: 100%;
  @include breakpoint($tablet-down) {
    text-align: center;
  }
  h1 {
    margin-bottom: 0;
  }
}
.data-explanation-container {
  max-width: 75%;
  margin: 0 auto;
  @include breakpoint($mobile-down) {
    max-width: 100%;
  }
}

.line {
  height: $decorative-line-size;
  width: 40%;
  background-color: $decorative-line-color;
  margin: 1rem auto 100px;
  @include breakpoint($mobile-down) {
    width: 75%;
    margin: 0 auto 60px;
  }
}
</style>
