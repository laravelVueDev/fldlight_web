<template>
  <div v-if="committees.length" class="committee-funding-committees">
    <h3>Upstream Political Committee Contributors</h3>

    <p>
      {{ displayName }} received monetary contributions from the following
      political committees {{ timeframeItem.desc }}.
    </p>

    <!-- todo: move into a base table component -->
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

          <th class="number">Total contributions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="committee in committees" :key="committee.committee_id">
          <td style="height: 61px;" class="committee-name">
            <router-link v-bind:to="url(committee)">{{
              committee.name
            }}</router-link>
            <!-- {{ committee.name }} -->
            <div
              v-if="
                committee.connected_organization_name &&
                  committee.connected_organization_name != 'NONE'
              "
              class="sub-head"
            >
              {{ committee.connected_organization_name }}
            </div>
            <div v-if="committee.candidate_name" class="sub-head">
              {{ committee.candidate_name }}
            </div>
          </td>
          <td>
            <PartyAffiliation
              :affiliation="committee.committee_party_affiliation"
            />
          </td>
          <td class="downstream">
            <PartiesBar :parties="committee.parties" />
          </td>
          <td class="number">
            {{ format(committee.total, "currency") }}
          </td>
        </tr>
      </tbody>
    </table>
    <Paginator
      v-if="resultCount"
      v-on:paginate="paginate"
      v-bind:initialStart="start"
      v-bind:display-count="displayCount"
      v-bind:rows="committees"
      v-bind:resultCount="resultCount"
    >
      Political committee contributors
    </Paginator>
  </div>
</template>

<script>
import format from "@/utils/number-format.js";
import PartyAffiliation from "@/components/PartyAffiliation.vue";
import PartiesBar from "@/components/PartiesBar.vue";
import Paginator from "@/components/Paginator.vue";
import sampleData from "../../fixtures/committee";
import { getInstance } from "../../auth/auth";
import { mapGetters } from "vuex";
import selectn from "selectn";

export default {
  name: "CommitteeFundingCommittees",
  components: {
    PartyAffiliation,
    PartiesBar,
    Paginator
  },
  props: {
    committee_id: String,
    displayName: String,
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
      window.scrollTo(0, 0);
    },
    timeframeItem() {
      this.start = 0;
      this.resultCount = 0;
      this.getData();
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
  },
  methods: {
    async getData() {
      this.updating = true;
      const url = `/committee/funding-committees/${this.committee_id}/${this.timeframeItem.start}/${this.timeframeItem.end}/?start=${this.start}&count=${this.displayCount}`;

      if (!this.isPaid) {
        const displaySampleData = Array.from(Array(11)).map(() => {
          return sampleData[0];
        });

        this.resultCount = displaySampleData.length;
        this.committees = displaySampleData.slice(0, this.displayCount);
        this.updating = false;
        return;
      }

      try {
        const response = await this.$http.get(url);

        this.resultCount = response.data.length;
        this.committees = response.data.slice(0, this.displayCount);
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
    },
    go(row) {
      const url = this.url(row);

      this.$router.push(url);
    }
  }
};
</script>

<style lang="scss" scoped>
.committee-funding-committees {
  margin-top: 40px;
}

.updating {
  opacity: 0;
  transition: opacity 200ms ease-out;
}

h3 {
  color: var(--color-nord-2);
}

table {
  margin-top: 20px;
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

.committee-name {
  width: 380px;
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

tr:hover td {
  background: #fafafa;
  transition: background 250ms ease-out;
  cursor: pointer;
}

.sub-head {
  font-size: 0.9em;
  margin-top: 4px;
}

th .sub-head {
  font-weight: 300;
}

.party-rep,
.party-dem {
  font-weight: 500;
}
</style>
