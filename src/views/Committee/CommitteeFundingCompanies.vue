<template>
  <div v-if="companies.length" class="committee-funding-companies">
    <h3>Corporate Contributors</h3>

    <p>
      Employees of the firms and their subsidiaries listed below made direct
      contributions to this political committee {{ timeframeItem.desc }}.
    </p>

    <!-- todo: move into a base table component -->
    <table class="committees-table" v-bind:class="updating ? 'updating' : ''">
      <thead>
        <tr>
          <th class="company-name">Company</th>
          <th class="number">Total contributions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="company in companies" v-bind:key="company.ticker">
          <td v-on:click="go(company)" class="company-name">
            <router-link v-bind:to="url(company)" class="company-name">{{
              company.name
            }}</router-link>
            <!-- {{ company.cmte_nm }} -->
            <div class="sub-head">
              <router-link v-bind:to="url(company)">{{
                company.employer_ticker
              }}</router-link>
            </div>
          </td>
          <td class="number">
            {{ format(company.total, "currency") }}
          </td>
        </tr>
      </tbody>
    </table>
    <Paginator
      v-if="resultCount"
      v-on:paginate="paginate"
      v-bind:initialStart="start"
      v-bind:display-count="displayCount"
      v-bind:rows="companies"
      v-bind:resultCount="resultCount"
    >
      Corporate contributors
    </Paginator>
  </div>
</template>

<script>
import format from "@/utils/number-format.js";
import Paginator from "@/components/Paginator.vue";

export default {
  name: "CommitteeFundingCompanies",
  components: {
    Paginator
  },
  props: {
    committee_id: String,
    timeframeItem: Object
  },
  data() {
    return {
      updating: true,
      displayCount: 10,
      resultCount: 0,
      start: 0,
      companies: []
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
      // hardcoding year range for now

      this.updating = true;
      const url = `/committee/funding-companies/${this.committee_id}/${this.timeframeItem.start}/${this.timeframeItem.end}/?start=${this.start}&count=${this.displayCount}`;

      try {
        const response = await this.$http.get(url);

        this.resultCount = response.data.length;
        this.companies = response.data.slice(0, this.displayCount);
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
    url(company) {
      return `/company/${company.employer_ticker}`;
    },
    go(company) {
      const url = this.url(company);
      this.$router.push(url).catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.committee-funding-companies {
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

a.company-name {
  color: var(--color-nord-3);
}

.sub-head a {
  font-weight: 500;
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
