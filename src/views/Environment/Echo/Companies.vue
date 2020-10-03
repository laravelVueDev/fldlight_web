<template>
  <div class="companies">
    <h4>Companies</h4>
    <ul class="companies">
      <li
        v-for="company in companies"
        v-bind:key="company.name"
        v-on:click="select(company)"
      >
        {{ company.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Companies",
  data() {
    return {
      updating: true,
      companies: [],
      selectedCompany: undefined
    };
  },
  created: function() {
    this.getData();
  },
  methods: {
    select(company) {
      this.selectedCompany = company;
      this.$emit("selected", company);
    },
    async getData() {
      this.updating = true;
      const url = "/companies";

      try {
        const response = await this.$http.get(url);
        this.companies = response.data.data;
        this.updating = false;
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
div.companies {
  margin-top: 20px;
  overflow-y: scroll;
  height: 80%;
}

ul.companies {
  min-height: 400px;
  max-height: 800px;
  overflow-y: scroll;
}

.updating {
  opacity: 0;
  transition: opacity 200ms ease-out;
}

ul {
  opacity: 1;
  transition: opacity 200ms ease-in;
  width: 100%;
}

li {
  padding: 15px 10px;
  border-bottom: 1px solid #f0f0f0;
  vertical-align: middle;
  transition: background 250ms ease-out;
  cursor: pointer;
}

li:hover {
  background: #fafafa;
  transition: background 250ms ease-out;
}
</style>
