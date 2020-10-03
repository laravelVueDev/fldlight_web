<template lang="html">
  <section class="company-of-the-day-teaser">
    <div class="container container-fluid">
      <div class="row">
        <h1 class="display2">
          Clear, un-biased data helps you better serve your clients
        </h1>

        <h3>Company of the day</h3>
        <div class="company-card">
          <h1 class="title">
            {{ companyOfTheDay.name }}
            <small>{{ companyOfTheDay.ticker }}</small>
          </h1>
          <CompanyStats
            :timeframe-item="timeframeItem"
            :company="companyOfTheDay"
            :stats="companyOfTheDay.politics.contributions"
          />
        </div>
        <router-link to="company-of-the-day" class="btn btn--lg btn--primary">
          See our data in action
        </router-link>
      </div>
    </div>
  </section>
</template>

<script lang="js">

import { mapGetters } from "vuex";
import CompanyStats from "@/views/CompanyDetail/CompanyStats";

  export default  {
    name: 'company-of-the-day-teaser',
    components: {
      CompanyStats
    },
    data() {
      // TODO: Rethink time frame
      return {
        timeframeItem: {
          active: true,
          desc: "over the last 12 years",
          end: 2019,
          label: "12 years",
          start: 2007,
          type: "recent"
        },
      }
    },
    props: [],
    methods: {
    },
    computed: {
      ...mapGetters(["companyOfTheDay"])
    }
}
</script>

<style scoped lang="scss">
.company-of-the-day-teaser {
  .row {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .company-card {
    border: 1px solid $gray7;
    box-shadow: 0px 5px 7px -1px $gray7;
    border-radius: 6px;
    padding: 2rem;
    text-align: left;
    max-width: 50rem;
    margin: 1rem auto;
    @include breakpoint($mobile-down) {
      padding: 1rem;
      margin-left: -1rem;
      margin-right: -1rem;
    }

    h1 {
      margin-bottom: 1rem;
      border-bottom: 1px solid $gray7;
      padding-bottom: 1rem;
    }
  }

  .btn {
    display: inline-block;
    margin-top: 2rem;
  }
}
</style>
