<template>
  <div class="committee">
    <div class="container container-fluid">
      <div class="committee-header">
        <h1>
          {{ displayNameHtml }}
          <small class="ticker">{{ committee_id }}</small>
        </h1>
        <Timeframe v-on:timeframe="timeframe" />
      </div>
      <div class="committee-content">
        <CommitteeFunding
          v-bind:committee_id="committee_id"
          v-bind:displayName="displayName"
          v-bind:timeframe-item="timeframeItem"
        />
        <CommitteeMeta
          v-bind:committee_id="committee_id"
          v-bind:timeframe-item="timeframeItem"
        />
      </div>

      <CommitteeFundingCommittees
        v-bind:timeframe-item="timeframeItem"
        v-bind:committee_id="committee_id"
        v-bind:display-name="displayName"
      />

      <CommitteeCommittees
        v-bind:timeframe-item="timeframeItem"
        v-bind:committee_id="committee_id"
        v-bind:display-name="displayName"
      />
    </div>
  </div>
</template>

<script>
import Timeframe from "@/components/Timeframe.vue";
import CommitteeFunding from "./CommitteeFunding.vue";
import CommitteeMeta from "./CommitteeMeta.vue";
import CommitteeFundingCommittees from "./CommitteeFundingCommittees.vue";
import CommitteeCommittees from "./CommitteeCommittees.vue";

export default {
  name: "Committee",
  components: {
    Timeframe,
    CommitteeFunding,
    CommitteeMeta,
    CommitteeFundingCommittees,
    CommitteeCommittees
  },
  props: {
    name: String,
    committee_id: String
  },
  data() {
    return {
      timeframeItem: null
    };
  },
  computed: {
    displayName() {
      return this.name.replace(/-/g, " ");
    },
    displayNameHtml() {
      return this.displayName.replace(/([\\/-])/g, "$1<br/>");
      // .replace(/\(/g, '<br/>(');
    }
  },
  methods: {
    timeframe(item) {
      this.timeframeItem = item;

      // so much of this can be inmproved! move this onto the child component
      this.$ga.event("committee", "timeframe", item.label);

      // at all necessary? shouldn't it change on bind?
      // maybe watching timeframeItem is a better idea
      this.$emit("timeframe", item);
    }
  }
};
</script>

<style lang="scss" scoped>
.committee {
  padding: 2rem 0 4rem;
}

.committee-content,
.committee-header {
  display: flex;
  justify-content: space-between;
}

.committee-content {
  margin: 3rem 0;
}
</style>
