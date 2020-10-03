<template>
  <div class="timeframe">
    <div class="timeframe-group">
      <div class="timeframe-label">Election cycles</div>
      <ul>
        <li
          v-for="item in cycles"
          v-bind:key="item.label"
          v-bind:class="{ active: item.active }"
          v-on:click="select(item)"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
    <div class="timeframe-group">
      <div class="timeframe-label">Most recent</div>
      <ul>
        <li
          v-for="item in recent"
          v-bind:key="item.label"
          v-bind:class="{ active: item.active }"
          v-on:click="select(item)"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import elections from "../utils/elections";
export default {
  name: "Timeframe",
  data() {
    return {
      lastItem: null
    };
  },
  methods: {
    select(item) {
      if (this.lastItem) {
        this.lastItem.active = false;
      }

      item.active = true;
      this.lastItem = item;
      this.store();
      this.$emit("timeframe", item, this.description);
    },
    store() {
      // session or local store? hmm...
      if (this.lastItem) {
        sessionStorage.setItem("timeframe", this.lastItem.label);
      }

      return sessionStorage.getItem("timeframe");
    }
  },
  computed: {
    cycles() {
      const presidentialCycles = elections
        .presidentialElectionDates()
        .reverse()
        .slice(0, 3);

      const currentYear = new Date().getUTCFullYear();

      return presidentialCycles.map(electionDate => {
        const endYear = electionDate.getUTCFullYear();
        const label = endYear >= currentYear ? "Current" : endYear;
        const active =
          this.lastItem &&
          this.lastItem.type === "cycle" &&
          this.lastItem.end === endYear;

        return {
          label: label.toString(),
          start: endYear - 4,
          end: endYear,
          type: "cycle",
          active: active
        };
      });
    },
    description() {
      const item = this.lastItem;

      if (!item) {
        return "";
      }

      let desc = "";

      if (item.type === "recent") {
        desc = `over the last ${item.label}`;
      } else {
        desc = `during the ${item.label.toLowerCase()} election cycle`;
      }

      // ew side effect
      item.desc = desc;

      return desc;
    },
    recent() {
      const currentYear = new Date().getUTCFullYear();
      let ranges = [],
        startYear = currentYear - 4;

      while (ranges.length < 3) {
        const yearCount = currentYear - startYear;
        const label = `${yearCount} years`;
        const active =
          this.lastItem &&
          this.lastItem.type === "recent" &&
          this.lastItem.label === label;

        ranges.push({
          label: label,
          start: startYear,
          end: currentYear,
          type: "recent",
          active: active
        });

        startYear -= 4;
      }

      return ranges;
    }
  },
  mounted() {
    const stored = this.store();

    if (stored) {
      this.cycles.concat(this.recent).some(item => {
        if (item.label === stored) {
          this.select(item);
          return true;
        }
        return false;
      });
    } else {
      this.select(this.recent[this.recent.length - 1]);
    }
  }
};
</script>

<style scoped lang="scss">
.timeframe {
  display: flex;
}

.timeframe-group:first-child {
  margin-right: 20px;
}

.timeframe-label {
  font-weight: 400;
  padding: 6px;
  text-align: center;
  border-bottom: 1px solid var(--color-nord-5);
  color: var(--color-nord-10);
  font-size: 11px;
  font-weight: 600;
}

.timeframe ul {
  display: flex;
}

.timeframe li {
  padding: 6px 10px;
  font-size: 13px;
  border-radius: 4px;
  margin: 4px 0 0 0;
  cursor: pointer;
  white-space: nowrap;
}

.timeframe li.active {
  font-weight: 500;
  padding: 6px 9px;
  background: var(--color-nord-6);
}
</style>
