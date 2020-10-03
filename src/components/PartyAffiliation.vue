<template>
  <span class="party" :class="[partyClass]">
    {{ affiliation || "None" }}
  </span>
</template>

<script>
export default {
  name: "PartyAffiliation",
  props: {
    affiliation: String
  },
  computed: {
    partyClass() {
      if (this.affiliation) {
        return `party-${this.affiliation.toLowerCase()}`;
      } else {
        return "party-other";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.party-other {
  color: #bbb;
}

.party-rep {
  color: var(--color-nord-11);
}

.party-dem {
  color: var(--color-nord-10);
}
</style>
