<template>
  <div class="fund">
    <div class="container container-fluid">
      <transition name="fade">
        <div v-show="!updating">
          <div class="content-header">
            <h1>
              {{ fund.name }}<span class="ticker">{{ fund.ticker }}</span>
            </h1>
            <Timeframe v-on:timeframe="timeframe" />
          </div>
          <FundStats
            v-bind:timeframe-item="timeframeItem"
            v-bind:fund="fund"
            v-bind:stats="stats"
          />
          <TopHoldings />
          <p class="fineprint">
            Sources: Federal Election Commission (FEC), Blackrock.<br />
            {{ stats.coveredHoldingsCount }} or
            {{ format(stats.coveredHoldingsPercent, "percent") }} of current
            constituents within the fund were represented in data provided by
            the FEC
          </p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import format from "@/utils/number-format.js";
import TopHoldings from "./TopHoldings";
import Timeframe from "@/components/Timeframe.vue";
import FundStats from "./FundStats.vue";
export default {
  name: "Fund",
  components: {
    FundStats,
    Timeframe,
    TopHoldings
  },
  data() {
    return {
      stats: {
        REP: {
          percent: 0,
          periodTotal: 0
        },
        DEM: {
          percent: 0,
          periodTotal: 0
        },
        Other: {
          percent: 0,
          periodTotal: 0
        }
      },
      fund: {},
      timeframeItem: null,
      updating: true
    };
  },
  // created: function() {
  //   this.getData();
  // },
  watch: {
    $route() {
      this.getData();
    }
  },
  computed: {
    totalContributions() {
      const val = this.stats.totalContributions;
      return val === undefined
        ? "-"
        : format(this.stats.totalContributions, "currency", false);
    }
  },
  methods: {
    format(...args) {
      return format(...args);
    },
    timeframe(item) {
      this.timeframeItem = item;
      this.$ga.event("fund", "timeframe", item.label);
      this.$emit("timeframe", item);
      this.getData();
    },

    async getData() {
      this.updating = true;

      this.stats = {
        coveredHoldingsCount: 0,
        REP: {
          percent: 0,
          periodTotal: 0
        },
        DEM: {
          percent: 0,
          periodTotal: 0
        },
        Other: {
          percent: 0,
          periodTotal: 0
        }
      };
      this.fund = {};

      const detailsUrl = `/funds/${this.$route.params.ticker}`;

      const timeframeParams = {
        type: this.timeframeItem.type,
        start: this.timeframeItem.start,
        end: this.timeframeItem.end,
        count: this.timeframeItem.end - this.timeframeItem.start
      };
      const statsUrl = `/funds/${this.$route.params.ticker}/stats`;

      try {
        this.$http.get(detailsUrl).then(res => (this.fund = res.data.data));

        this.$http
          .get(statsUrl, { params: timeframeParams })
          .then(res => (this.stats = res.data.data));

        this.updating = false;
      } catch (e) {
        console.warn(e);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.fund {
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

.description {
  max-width: 50rem;
}

.fineprint {
  margin-top: 4em;
  font-size: 0.8em;
  color: #bbb;
}
</style>
