<template>
  <div class="facilities">
    <h4>Facilities</h4>
    <Search v-on:search="setQuery" />
    <table class="facilities">
      <tr
        v-for="facility in facilities"
        v-bind:key="facility.id"
        @click="selectFacility(facility)"
      >
        <td>
          <input
            type="checkbox"
            v-model="selectedFacilities"
            :value="facility.id"
            number
          />
        </td>
        <td>
          {{ facility.name }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Search from "./Search";

export default {
  name: "Facilities",
  props: {
    company: Object
  },
  components: {
    Search
  },
  watch: {
    company() {
      this.reset();
    }
  },
  data() {
    return {
      updating: true,
      queryString: "",
      facilities: [],
      selectedFacilities: []
    };
  },
  methods: {
    reset() {
      this.facilities = [];
    },
    selectFacility(facility) {
      console.log(this.selectedFacilities);
      if (facility in this.selectedFacilities) {
        this.deleteCompanyFacility(facility);
      } else {
        this.createCompanyFacility(facility);
      }
    },
    setQuery(q) {
      if (!this.company) {
        return;
      }

      this.queryString = q;
      // this.$emit("timeframe", company);
      this.getData();
    },
    async createCompanyFacility(facility) {
      this.updating = true;
      const url = `/company_facilities`;

      try {
        await this.$http.post(url, {
          company_id: this.company.id,
          facility_id: facility.id
        });

        this.updating = false;
      } catch (e) {
        console.error(e);
      }
    },
    async getData() {
      this.updating = true;
      const url = "/echo/facilities/unaffiliated";

      try {
        const response = await this.$http.get(url, {
          params: { q: this.queryString }
        });
        this.facilities = response.data.data;
        this.updating = false;
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
div.facilities {
  margin-top: 20px;
  overflow-y: scroll;
  height: 80%;

  table {
    min-height: 400px;
    max-height: 800px;
    overflow-y: scroll;
    opacity: 1;
    transition: opacity 200ms ease-in;
  }
  td {
    padding: 0.5em 0.3em;
    border-bottom: 1px solid #f0f0f0;
    vertical-align: middle;
    transition: background 250ms ease-out;
    cursor: pointer;
  }

  tr:hover {
    background: #fafafa;
    transition: background 250ms ease-out;
  }
}

.updating {
  opacity: 0;
  transition: opacity 200ms ease-out;
}
</style>
