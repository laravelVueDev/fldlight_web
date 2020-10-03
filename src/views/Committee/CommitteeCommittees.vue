<template>
  <div v-if="committees.length" class="committee-funding-committees">
    <h3>Downstream Recipients</h3>

    <p>
      {{ displayName }} contributed funds to the following political committees
      and candidates {{ timeframeItem.desc }}.
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
        <tr v-for="committee in committees" :key="committee.other_id">
          <td style="height: 61px;" class="committee-name">
            <router-link
              v-if="committee.committee_id"
              v-bind:to="url(committee)"
              >{{ committee.committee_name }}</router-link
            >
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
            <PartyAffiliation :affiliation="committee.party_affiliation" />
          </td>
          <td class="downstream">
            <PartiesBar v-if="committee.parties" :parties="committee.parties" />
            <span v-else>N/A</span>
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
      Political committee recipients
    </Paginator>
  </div>
</template>

<script>
import format from "@/utils/number-format.js";
import PartyAffiliation from "@/components/PartyAffiliation.vue";
import PartiesBar from "@/components/PartiesBar.vue";
import Paginator from "@/components/Paginator.vue";

export default {
  name: "CommitteeCommittees",
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
  methods: {
    async getData() {
      this.updating = true;
      const url = `/committee/committees/${this.committee_id}/${this.timeframeItem.start}/${this.timeframeItem.end}/?start=${this.start}&count=${this.displayCount}`;

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
        committee.committee_name.replace(/\s/g, "-")
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
  vertical-align: top;
  padding: 6px 10px;
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

.committee-name {
  width: 380px;
}

tr:hover td {
  background: #fafafa;
  transition: background 250ms ease-out;
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
