<template>
  <div
    class="selectable-card"
    @click="onSelect"
    v-bind:class="{ selected: selected }"
  >
    <div v-if="isCurrentPlan" class="badge">Current Plan</div>
    <div class="card-header">
      <h3 class="card-header-title">{{ title }}</h3>
    </div>
    <div class="card-content">
      <div class="card-content-text">{{ content }}</div>
      <div class="card-content-summary">
        <p>
          <strong>{{ summary }}</strong>
        </p>
      </div>
    </div>
    <button
      v-if="!isCurrentPlan"
      :class="['btn', selected ? 'btn--primary' : 'btn--primary-outline']"
    >
      Select
    </button>
  </div>
</template>

<script lang="js">
export default {
  name: 'selectable-card',
  props: {
    id: String,
    title: String,
    content: String,
    summary: String,
    selected: Boolean,
    isCurrentPlan: Boolean
  },
  methods: {
    onSelect: function () {
      this.$emit('selectable-card-selected', this.id);
    },
  },
}
</script>

<style scoped lang="scss">
.selectable-card {
  border: 1px solid $gray4;
  border-radius: 4px;
  padding: 2rem 1rem 1rem;
  min-height: 14rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  position: relative;

  .badge {
    position: absolute;
    top: -0.6rem;
    left: 50%;
    transform: translateX(-50%);
    color: $white;
    background-color: $primary;
    font-size: 0.8rem;
    padding: 0.25rem 0.5rem;
  }

  &:hover {
    cursor: pointer;
    background-color: $gray9;
  }

  div.card-content {
    flex: 1;

    .card-content-summary {
      margin: 1em auto 0 auto;
      text-align: center;
      vertical-align: bottom;
    }
  }
}

.selectable-card.selected {
  background-color: $gray9;
  border-color: $primary;
}
</style>
