<template>
  <div class="company-employee-transactions">
    <!-- Todo: move into a base data table component -->
    <table v-bind:class="updating ? 'updating' : ''">
      <thead>
        <tr>
          <th>Receiver</th>
          <th>Party Affiliation</th>
          <th>Date</th>
          <th class="number">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in transactions" v-bind:key="transaction.sub_id">
          <td class="committee-name">
            <router-link
              v-bind:to="url(transaction)"
              :class="{ 'blurry-text-link': !isPaid }"
              >{{ transaction.committee_name }}</router-link
            >
            <div
              v-if="
                transaction.connected_organization_name &&
                  transaction.connected_organization_name != 'NONE'
              "
              class="sub-head"
            >
              <span :class="{ 'blurry-text': !isPaid }">
                {{ transaction.connected_organization_name }}
              </span>
            </div>
            <div v-if="transaction.candidate_name" class="sub-head">
              <span :class="{ 'blurry-text': !isPaid }">
                {{ transaction.candidate_name }}
              </span>
            </div>
          </td>
          <td>
            <PartyAffiliation
              :affiliation="transaction.committee_party_affiliation"
            />
          </td>
          <td class="date">
            {{ new Date(transaction.transaction_date).toDateString() }}
          </td>
          <td class="number">
            <span :class="{ 'blurry-text': !isPaid }">
              {{ format(transaction.transaction_amount, "currency") }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- TODO: Replace pagination with data table
        Chat with backend... Fetch all at once? or new call per 10?
     -->
    <Paginator
      v-if="resultCount"
      v-on:paginate="paginate"
      v-bind:initialStart="start"
      v-bind:display-count="displayCount"
      v-bind:rows="transactions"
      v-bind:resultCount="resultCount"
    >
      Contribution transactions
    </Paginator>
  </div>
</template>

<script>
import format from "@/utils/number-format.js";
import PartyAffiliation from "@/components/PartyAffiliation.vue";
import Paginator from "@/components/Paginator.vue";
import { mapGetters } from "vuex";
import selectn from "selectn";
import sampleData from "../../fixtures/employeeTransaction";
import { getInstance } from "../../auth/auth";

export default {
  name: "CompanyEmployeeTransactions",
  components: {
    PartyAffiliation,
    Paginator
  },
  props: {
    company: Object,
    timeframeItem: Object,
    name: String
  },
  data() {
    return {
      updating: true,
      displayCount: 10,
      resultCount: 0,
      start: 0,
      transactions: []
    };
  },
  watch: {
    $route() {
      this.start = 0;
      this.resultCount = 0;
      this.getData();
    },
    timeframeItem() {
      this.start = 0;
      this.resultCount = 0;
      this.getData();
    },
    name() {
      this.start = 0;
      this.resultCount = 0;
      this.getData();
    }
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.updating = true;
      const url = `/company/employee-transactions/${this.$route.params.ticker}/${this.timeframeItem.start}/${this.timeframeItem.end}/?name=${this.name}&start=${this.start}&count=${this.displayCount}`;

      if (!this.isPaid) {
        const displaySampleData = Array.from(Array(11)).map(() => {
          return sampleData;
        });

        this.resultCount = displaySampleData.length;
        this.transactions = displaySampleData.slice(0, this.displayCount);
        this.updating = false;
        return;
      }

      try {
        const response = await this.$http.get(url);

        this.resultCount = response.data.length;
        this.transactions = response.data.slice(0, this.displayCount);
        this.updating = false;
      } catch (e) {
        // do nuthin?
        console.warn(e);
      }
    },
    paginate(start, displayCount) {
      this.start = start;
      this.displayCount = displayCount;
      this.getData();
    },
    format(...args) {
      return format(...args);
    },
    url(cmte) {
      return `/committee/${cmte.committee_id}/${encodeURIComponent(
        cmte.committee_name.replace(/\s/g, "-")
      )}/`;
    }
  },
  computed: {
    ...mapGetters(["subscription"]),
    isPaid() {
      const authService = getInstance();
      const paidPlanNames = ["monthly", "annual"];
      // auth0 access token can fall behind. Look first at local store for correct value
      const localStorePlan = selectn("plan.nickname", this.subscription);
      const sessionPlan = selectn(
        "subscription.plan.nickname",
        authService.getAppMetadata()
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
.updating {
  opacity: 0;
  transition: opacity 200ms ease-out;
}

table {
  margin-top: 40px;
  opacity: 1;
  transition: opacity 200ms ease-in;
  width: 100%;
}

th {
  text-align: left;
  font-weight: 400;
  border-bottom: 1px solid #ddd;
  padding: 6px 10px;
  vertical-align: top;
  font-size: 0.9em;
}

th.number {
  text-align: right;
}

td {
  padding: 15px 10px;
  border-bottom: 1px solid #f0f0f0;
  vertical-align: middle;
  transition: background 250ms ease-out;
  font-size: 0.9em;
  /* cursor: pointer; */
  height: 40px;
}

tr:hover td {
  background: #fafafa;
  transition: background 250ms ease-out;
}

.committee-name {
  width: 200px;
}

.sub-head {
  font-size: 13px;
  color: #666;
}

th .sub-head {
  font-weight: 300;
}

.party-rep,
.party-dem {
  font-weight: 500;
}
</style>
