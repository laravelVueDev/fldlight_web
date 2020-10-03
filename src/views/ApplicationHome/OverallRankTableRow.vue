<template>
  <tr v-on:click="go">
    <td>
      <span class="company-name">{{ company.name }}</span>
    </td>
    <td>
      <router-link v-bind:to="url">{{ company.employer_ticker }}</router-link>
    </td>
    <td class="value">{{ value }}</td>
  </tr>
</template>

<script>
import format from "@/utils/number-format.js";

export default {
  name: "OverallRankTableRow",
  props: {
    company: Object
  },
  computed: {
    url() {
      const ticker = this.company.employer_ticker;
      return `/companies/${ticker}`;
    },
    value() {
      return format(this.company.total, "currency2", true);
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
  .company-name {
    display: inline-block;
  }
  &:last-of-type {
    text-align: right;
    white-space: nowrap;
  }
}
</style>
