<template>
  <div class="company-stats">
    <transition name="fade">
      <div>
        <div class="stats-group">
          <div class="stat">
            <div class="number dollars">
              {{ format(stats.total, "currencyMax2", "short") }}
            </div>
            <div class="label">Total contributed</div>
          </div>
          <div class="stat stat-splits">
            <div class="number">
              <div class="number-group">
                <span class="party party-dem">{{
                  format(demPercent * 100, "integer")
                }}</span>
                <small>%</small>
                <div class="label">Democrat</div>
              </div>
              <span class="separator">/</span>
              <div class="number-group">
                <span class="party party-other">{{
                  format(otherPercent * 100, "integer")
                }}</span>
                <small>%</small>
                <div class="label">Other</div>
              </div>
              <span class="separator">/</span>
              <div class="number-group">
                <span class="party party-rep">{{
                  format(repPercent * 100, "integer")
                }}</span>
                <small>%</small>
                <div class="label">Republican</div>
              </div>
            </div>
          </div>
          <div class="stat">
            <div class="number number-employees">
              {{ format(stats.contributingEmployeeCount, "integer") }}
            </div>
            <div class="label">Contributing employees</div>
          </div>
        </div>

        <p class="description" v-if="timeframeItem">
          Of the total
          {{ format(stats.total, "currencyMax2", "full") }} contributed by
          employees of {{ company.name }} and its subsidiaries
          {{ timeframeItem.desc }}, {{ leadingPercent }} ({{
            format(leadingTotal, "currencyMax2", "short")
          }}) went to the
          <strong
            :class="[demPercent > repPercent ? 'party-dem' : 'party-rep']"
          >
            {{ leadingParty }}
          </strong>
          party.
          {{ format(stats.contributingEmployeeCount, "integer") }} employees
          made contributions.
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
// TODO: Make this a mixin
import format from "@/utils/number-format.js";
import { formatNumber } from "@/utils/format-number";
export default {
  name: "CompanyStats",
  props: {
    company: Object,
    stats: Object,
    timeframeItem: Object
  },
  data() {
    return {
      total: null,
      demTotal: null,
      repTotal: null,
      demPct: null,
      repPct: null,
      otherPct: null,
      leadingPct: null
    };
  },
  methods: {
    // todo: make this a mixin
    format(...args) {
      // return format.apply(null, arguments);
      return format(...args);
    }
  },
  computed: {
    demPercent() {
      return this.stats.DEM / this.stats.total;
    },
    repPercent() {
      return this.stats.REP / this.stats.total;
    },
    otherPercent() {
      return this.stats.Other / this.stats.total;
    },
    leadingPercent() {
      return formatNumber(Math.max(this.demPercent, this.repPercent));
    },
    leadingTotal() {
      return this.stats.DEM > this.stats.REP ? this.stats.DEM : this.stats.REP;
    },
    leadingParty() {
      return this.stats.DEM > this.stats.REP ? "Democratic" : "Republican";
    }
  }
};
</script>

<style lang="scss" scoped>
.company-stats {
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
