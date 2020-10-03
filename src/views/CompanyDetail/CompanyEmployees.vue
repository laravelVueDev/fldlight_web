<template>
  <div class="company-employees">
    <h2>Employee Contributions</h2>
    <p v-if="timeframeItem">
      {{ company.name }} employees contributing the most to political parties
      and candidates {{ timeframeItem.desc }}
      are shown below. Select any employee to see individual contribution
      history.
    </p>
    <transition name="fade">
      <div v-if="!updating" class="company-employees-content">
        <div class="employee-list">
          <h3>Top {{ company.ticker }} Contributors</h3>
          <ul>
            <li
              v-for="employee in employees"
              v-bind:key="employee.id"
              v-bind:class="employee === selected ? 'active' : ''"
              v-on:click="select(employee)"
            >
              <div class="name">
                <span :class="{ 'blurry-text': !isPaid }">
                  {{ employee.name_clean }}
                </span>
              </div>
              <p>
                {{ employee.count }} contributions totalling
                <span :class="{ 'blurry-text': !isPaid }">
                  {{ format(employee.total, "currency") }}
                </span>
              </p>
            </li>
          </ul>
        </div>
        <div class="employee-transactions">
          <div class="employee-header">
            <div>
              <span :class="['name', { 'blurry-text': !isPaid }]">{{
                selected.name_clean
              }}</span>
              <div class="pos">{{ selected.occupation }}</div>
              <div class="firm">{{ selected.employer }}</div>
              <div class="loc">{{ selected.city }}, {{ selected.state }}</div>
            </div>

            <div>
              <span
                :class="[{ 'blurry-text-total': !isPaid }, 'number dollars']"
              >
                {{ format(selected.total, "currency") }}
              </span>
              <div class="label">Total Contributed</div>
            </div>
          </div>

          <CompanyEmployeeTransactions
            :key="selected.name_clean"
            :company="company"
            :timeframe-item="timeframeItem"
            :name="selected.name_clean"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import format from "@/utils/number-format.js";
import CompanyEmployeeTransactions from "./CompanyEmployeeTransactions";
import { mapGetters } from "vuex";
import selectn from "selectn";
import sampleData from "../../fixtures/employee";

export default {
  name: "CompanyEmployees",
  components: {
    CompanyEmployeeTransactions
  },
  props: {
    company: Object,
    timeframeItem: Object
  },
  data() {
    return {
      updating: true,
      selected: {},
      selectedEmployee: null,
      employees: []
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
  methods: {
    format(...args) {
      return format(...args);
    },
    async getData() {
      this.updating = true;
      const url = `/company/employees/${this.$route.params.ticker}/${this.timeframeItem.start}/${this.timeframeItem.end}/`;

      if (!this.isPaid) {
        this.employees = Array.from(Array(11)).map((_, i) => {
          return Object.assign(
            {
              id: `${sampleData.name_clean}-${i}`
            },
            sampleData
          );
        });

        this.selected = this.employees[0];
        this.updating = false;
        return;
      }

      try {
        const response = await this.$http.get(url);
        this.employees = response.data;

        if (this.employees.length) {
          this.selected = this.employees[0];
        }

        this.updating = false;
      } catch (e) {
        // do nuthin?
        console.warn(e);
      }
    },
    select(empName) {
      this.selected = empName;
    }
  },
  computed: {
    ...mapGetters(["subscription"]),
    isPaid() {
      const paidPlanNames = ["monthly", "annual"];
      // auth0 access token can fall behind. Look first at local store for correct value
      const localStorePlan = selectn("plan.nickname", this.subscription);
      const sessionPlan = selectn(
        "subscription.plan.nickname",
        this.$auth.getAppMetadata()
      );

      const planNickname = localStorePlan || sessionPlan;

      if (!planNickname) {
        return false;
      }

      return paidPlanNames.includes(planNickname.toLowerCase());
    }
  }
};
</script>

<style lang="scss" scoped>
.company-employees {
  margin: 80px 0;
}
.company-employees-content {
  display: flex;
  justify-content: space-between;
  margin-top: 60px;
}
.employee-list {
  width: 28%;
}
h3 {
  color: var(--color-nord-3);
  font-size: 1.2em;
  font-weight: 400;
}
ul {
  margin: 15px 0;
  box-shadow: 2px 1px 4px #ddd;
  background: var(--color-nord-6);
  border-radius: 6px;
}
li {
  padding: 14px 10px 14px 20px;
  cursor: pointer;
  color: #666;
  transition: all 0.25s ease-in-out;
  // border-bottom: 1px solid #f0f0f0;
  border-bottom: 2px solid var(--color-nord-6);
}

li.active {
  background: #fff;
  // border-radius: 6px;
  border-bottom: 2px solid var(--color-nord-10);
  cursor: default;
  color: var(--color-nord-2);
  text-indent: 8px;
  transition: all 0.25s ease-in-out;
}

li:hover {
  color: var(--color-nord-2);
  transition: all 0.25s ease-in-out;
}

li:first-child {
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
li:last-child {
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

li div {
  line-height: 1.2em;
}

li p {
  margin: 4px 0;
  font-size: 0.8em;
}

li .name {
  font-size: 0.9em;
  font-weight: 500;
}

li .dollars {
  color: var(--color-nord-2);
}

.employee-transactions {
  width: 65%;
  padding-left: 20px;
}

.employee-header {
  // margin-top: 25px;
  display: flex;
  justify-content: space-between;
}

.employee-header .name {
  font-size: 1.2em;
  font-weight: 500;
}

.employee-header .label {
  text-align: center;
  margin-top: 10px;
  font-size: 0.8em;
}

.employee-header .dollars {
  font-weight: 500;
  font-size: 2em;
  text-align: center;
}

.pos {
  margin: 10px 0 0 0;
}
.pos,
.firm {
  line-height: 1.1em;
  font-size: 0.9em;
}

.loc {
  font-size: 0.9em;
  margin: 8px 0 0 0;
  color: #999;
}
</style>
