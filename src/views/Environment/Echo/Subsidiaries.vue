<template>
  <div class="subsidiaries">
    <h4>Subsidiaries</h4>
    <ul class="subsidiaries" v-bind:class="updating ? 'updating' : ''">
      <li v-for="(subsidiary, i) in subsidiaries" :key="i">
        {{ subsidiary.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Subsidiaries",
  props: {
    company: Object
  },
  data() {
    return {
      updating: true,
      subsidiaries: []
    };
  },
  watch: {
    company() {
      this.getData();
    }
  },
  methods: {
    async getData() {
      this.updating = true;
      const url = `/companies/${this.company.ticker}/subsidiaries`;

      try {
        const response = await this.$http.get(url);
        this.subsidiaries = response.data.data;
        this.updating = false;
      } catch (e) {
        console.warn(e);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
div.subsidiaries {
  margin-top: 20px;
  overflow-y: scroll;
  height: 80%;
}

ul.subsidiaries {
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
  /*cursor: pointer;*/
}

li:hover {
  background: #fafafa;
  transition: background 250ms ease-out;
}
</style>
