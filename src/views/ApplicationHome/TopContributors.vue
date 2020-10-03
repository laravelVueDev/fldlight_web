<template>
  <div class="overall">
    <div class="content-header">
      <h1>S&P 500 Top Contributors</h1>
      <Timeframe v-on:timeframe="timeframe"></Timeframe>
    </div>
    <transition name="fade">
      <div class="overall-tables-container" v-show="!updating">
        <p class="description">
          The employees and political action committees of the corporations
          listed below have donated the largest political contributions of all
          firms in the S&amp;P 500 {{ timeframeItem.desc }}.
        </p>
        <div class="overall-tables row">
          <div class="col-lg-4">
            <h4>Overall</h4>
            <table>
              <tbody>
                <OverallRankTableRow
                  v-for="row in top"
                  v-bind:company="row"
                  v-bind:key="row.ticker"
                ></OverallRankTableRow>
              </tbody>
            </table>
          </div>
          <div class="col-lg-4">
            <h4>
              Top <span class="party party-dem">Democratic</span> Contributors
            </h4>
            <table>
              <tbody>
                <OverallRankTableRow
                  v-for="row in topDem"
                  v-bind:company="row"
                  v-bind:key="row.ticker"
                ></OverallRankTableRow>
              </tbody>
            </table>
          </div>
          <div class="col-lg-4">
            <h4>
              Top <span class="party party-rep">Republican</span> Contributors
            </h4>
            <table>
              <tbody>
                <OverallRankTableRow
                  v-for="row in topRep"
                  v-bind:company="row"
                  v-bind:key="row.ticker"
                ></OverallRankTableRow>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import Timeframe from "@/components/Timeframe.vue";
import OverallRankTableRow from "./OverallRankTableRow.vue";

export default {
  name: "TopContributors",
  components: {
    Timeframe,
    OverallRankTableRow
  },
  data() {
    return {
      top: null,
      topDem: null,
      topRep: null,
      timeframeItem: { desc: "" },
      updating: true
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    timeframe(item) {
      this.timeframeItem = item;
      this.$ga.event("overall", "timeframe", item.label);
      this.getData();
    },
    async getData() {
      const overallURL = `/overall/${this.timeframeItem.start}/${this.timeframeItem.end}/`;
      this.updating = true;

      try {
        const response = await this.$http.get(overallURL);

        // now, do you parse the data here? or do a bunch o computed things below??? decisions
        this.top = response.data.data.top;
        this.topDem = response.data.data.topDem;
        this.topRep = response.data.data.topRep;
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
// TODO Clean up this component
.overall {
  margin-top: 2rem;
  border-top: 1px solid $gray8;
  padding-top: 3rem;
}

.content-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-left: $decorative-line-size solid $decorative-line-color;
  padding-left: 2rem;
  margin-bottom: 2rem;
  h1 {
    margin-bottom: 0;
  }
}

.description {
  max-width: 50rem;
}

.overall-tables-container {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
}

.overall-tables {
  margin-top: 40px;
  display: flex;

  > div {
    border-right: 1px solid $gray8;
    &:last-child {
      padding-right: 0;
      border-right: none;
      margin-right: 0;
    }
  }

  table {
    width: 100%;
  }
}
</style>
