<template>
  <div class="company-committees">
    <h2>Top Recipients of {{ company.ticker }}'s Contributions</h2>
    <p v-if="timeframeItem">
      {{ company.name }}'s aggregated employee contributions
      {{ timeframeItem.desc }}
      have been donated to the committees and candidates listed below.
    </p>

    <!-- TODO: move into a reusable data table component -->
    <table class="committees-table" v-bind:class="updating ? 'updating' : ''">
      <thead>
        <tr>
          <th class="committee-name">
            Committee
            <div class="sub-head">Associated Organization &amp; Candidate</div>
          </th>
          <th>Party affiliation</th>
          <th class="downstream">
            Downstream contributions
            <div class="sub-head">Committee party alignment</div>
          </th>
          <th class="number">Total received<br />from {{ company.ticker }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(committee, i) in committees" :key="i">
          <td style="height: 61px;" class="committee-name">
            <router-link
              v-bind:to="url(committee)"
              :class="{ 'blurry-text-link': !isPaid }"
              >{{ committee.name }}</router-link
            >
            <div
              v-if="
                committee.connected_organization_name &&
                  committee.connected_organization_name != 'NONE'
              "
              :class="[{ 'blurry-text': !isPaid }, 'sub-head']"
            >
              {{ committee.connected_organization_name }}
            </div>
            <div
              v-if="committee.candidate_name"
              :class="[{ 'blurry-text': !isPaid }, 'sub-head']"
            >
              {{ committee.candidate_name }}
            </div>
          </td>
          <td>
            <PartyAffiliation :affiliation="committee.party_affiliation" />
          </td>
          <td class="downstream">
            <PartiesBar
              v-if="committee.parties"
              :key="committee.parties.length"
              :parties="committee.parties"
            />
          </td>
          <td class="number">
            <span :class="{ 'blurry-text': !isPaid }">
              {{ format(committee.total, "currency") }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- TODO: Replace with datatable component -->
    <Paginator
      v-if="resultCount"
      v-on:paginate="paginate"
      v-bind:initialStart="start"
      v-bind:display-count="displayCount"
      v-bind:rows="committees"
      v-bind:resultCount="resultCount"
    >
      Contribution recipients
    </Paginator>
  </div>
</template>

<script>
import format from "@/utils/number-format.js";
import Paginator from "@/components/Paginator.vue";
import PartyAffiliation from "@/components/PartyAffiliation.vue";
import PartiesBar from "@/components/PartiesBar.vue";
import selectn from "selectn";
import { mapGetters } from "vuex";
import sampleData from "../../fixtures/committee";

export default {
  name: "CompanyCommittees",
  components: {
    PartyAffiliation,
    PartiesBar,
    Paginator
  },
  props: {
    company: Object,
    timeframeItem: Object
  },
  data() {
    return {
      updating: true,
      displayCount: 10,
      resultCount: 0,
      start: 0,
      committees: []
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
    }
  },
  methods: {
    async getData() {
      this.updating = true;
      const url = `/company/committees/${this.$route.params.ticker}/${this.timeframeItem.start}/${this.timeframeItem.end}/?start=${this.start}&count=${this.displayCount}`;

      if (!this.isPaid) {
        this.committees = Array.from(Array(11)).map(() => {
          return sampleData[0];
        });

        this.resultCount = this.committees.length;
        this.updating = false;
        return;
      }

      try {
        const response = await this.$http.get(url);
        this.resultCount = response.data.length;
        this.committees = response.data;
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
    url(committee) {
      return `/committee/${committee.committee_id}/${encodeURIComponent(
        committee.name.replace(/\s/g, "-")
      )}/`;
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
.company-committees {
  margin-top: 40px;
}

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
  font-weight: 500;
  border-bottom: 1px solid #ccc;
  padding: 6px 10px;
  vertical-align: top;
}

th.number {
  text-align: right;
}

td {
  padding: 15px 10px;
  border-bottom: 1px solid #f0f0f0;
  vertical-align: middle;
  transition: background 250ms ease-out;
  /* cursor: pointer; */
}

td.downstream {
  width: 200px;
}

tr:hover td {
  background: #fafafa;
  transition: background 250ms ease-out;
}

.committee-name {
  width: 380px;
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
