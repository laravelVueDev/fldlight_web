<template>
  <tr v-on:click="go">
    <td class="constituent-name">
      <router-link v-bind:to="url">{{ constituent.name }}</router-link>
    </td>
    <td class="number">{{ constituent.weight }}%</td>
    <td class="downstream">
      <PartiesBar
        v-if="constituent.contributions"
        :key="constituent.contributions.length"
        :parties="constituent.contributions"
      />
    </td>
  </tr>
</template>

<script>
import PartiesBar from "@/components/PartiesBar.vue";

export default {
  name: "ConstituentTableRow",
  props: {
    constituent: Object
  },
  components: {
    PartiesBar
  },
  computed: {
    url() {
      const ticker = this.constituent.ticker;
      return `/companies/${ticker}`;
    }
  },
  methods: {
    go(e) {
      if (e.srcElement.tagName !== "A") {
        this.$router.push(this.url);
      }
    }
  }
};
</script>

<style scoped lang="scss">
tr {
  &:hover {
    background-color: $gray9;
    cursor: pointer;
  }
}

td {
  padding: 0.75rem 0.5rem;
  vertical-align: top;
}

td.constituent-name {
  width: 380px;
}

td.downstream {
  width: 200px;
}
</style>
