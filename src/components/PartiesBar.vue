<template>
  <div class="parties-bar">
    <div
      v-bind:style="'width: ' + demWidth + 'px;'"
      class="party-dem-fill"
    ></div>
    <div
      v-bind:style="'width: ' + otherWidth + 'px;'"
      class="party-other-fill"
    ></div>
    <div
      v-bind:style="'width: ' + repWidth + 'px;'"
      class="party-rep-fill"
    ></div>
  </div>
</template>

<script>
export default {
  name: "PartiesBar",
  props: {
    parties: Object,
    width: Number
  },
  computed: {
    maxWidth() {
      return this.width || 200;
    },
    demWidth() {
      return this.parties.DEM.percent * this.maxWidth;
    },
    otherWidth() {
      return this.parties.Other.percent * this.maxWidth;
    },
    repWidth() {
      return this.parties.REP.percent * this.maxWidth;
    }
  }
};
</script>
<style lang="scss" scoped>
.parties-bar {
  height: 10px;
  display: flex;
  border-radius: 4px;
  overflow: hidden;
}
.party-rep-fill {
  background-color: $nord11;
}
.party-dem-fill {
  background-color: $nord10;
}
.party-other-fill {
  background-color: $nord4;
}
</style>
