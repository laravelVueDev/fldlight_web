<template>
  <div class="fund-stats">
    <transition name="fade">
      <div>
        <div class="stats-group">
          <div class="stat">
            <div class="number dollars">
              {{ format(stats.totalContributions, "currencyMax2", "short") }}
            </div>
            <div class="label">Total contributed</div>
          </div>
          <div class="stat stat-splits">
            <div class="number">
              <div class="number-group">
                <span class="party party-dem">{{
                  format(stats.DEM.percent * 100, "integer")
                }}</span>
                <small>%</small>
                <div class="label">Democrat</div>
              </div>
              <span class="separator">/</span>
              <div class="number-group">
                <span class="party party-other">{{
                  format(stats.Other.percent * 100, "integer")
                }}</span>
                <small>%</small>
                <div class="label">Other</div>
              </div>
              <span class="separator">/</span>
              <div class="number-group">
                <span class="party party-rep">{{
                  format(stats.REP.percent * 100, "integer")
                }}</span>
                <small>%</small>
                <div class="label">Republican</div>
              </div>
            </div>
          </div>
        </div>

        <p class="description" v-if="timeframeItem">
          Of the total
          {{ format(stats.totalContributions, "currencyMax2", "full") }}
          contributed by employees of the constituents within the fund
          {{ timeframeItem.desc }}, {{ leadingPercent }} ({{
            format(leadingTotal, "currencyMax2", "short")
          }}) went to the
          <strong
            :class="[
              this.stats.DEM.percent > this.stats.REP.percent
                ? 'party-dem'
                : 'party-rep'
            ]"
          >
            {{ leadingParty }}
          </strong>
          party.
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
import format from "@/utils/number-format.js";
import { formatNumber } from "@/utils/format-number";
export default {
  name: "FundStats",
  props: {
    fund: Object,
    stats: Object,
    timeframeItem: Object
  },
  methods: {
    // todo: make this a mixin
    format(...args) {
      return format(...args);
    }
  },
  computed: {
    leadingPercent() {
      return formatNumber(
        Math.max(this.stats.DEM.percent, this.stats.REP.percent)
      );
    },
    leadingTotal() {
      return Math.max(this.stats.DEM.periodTotal, this.stats.REP.periodTotal);
    },
    leadingParty() {
      return this.stats.DEM.periodTotal > this.stats.REP.periodTotal
        ? "Democratic"
        : "Republican";
    }
  }
};
</script>

<style lang="scss" scoped>
.fund-stats {
  margin-top: 1.5rem;
  width: 100%;
}

.description {
  max-width: 50rem;
}

.stats-group {
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;

  @include breakpoint($tablet-up) {
    flex-direction: row;
  }
}

.stat {
  padding: 1rem 0;
}

.stat .number {
  font-size: 3em;
  color: #ccc;
}

.stat .number {
  font-weight: 500;
}

.stat .label,
.stat .number {
  text-align: left;
}

.stat .number small {
  font-size: 0.4em;
  font-weight: 300;
  color: $nord3;
}

.stat-splits .number {
  display: flex;
  justify-content: space-between;
}

.stat .number .separator {
  font-weight: 200;
  margin: 0 15px;
}

.stat .number-employees {
  text-align: right;
  color: $nord3;
  font-weight: 300;
}

.stat .label {
  margin-top: 6px;
  font-size: 13px;
}

.stat .number-group .label {
  font-weight: 300;
  color: $nord3;
}

.stat .dollars {
  color: $nord14;
}
</style>
