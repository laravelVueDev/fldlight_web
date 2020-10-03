<template>
  <!-- Replace with data table component -->
  <div class="paginator">
    <div>
      <a
        v-if="start > 0"
        v-on:click.prevent="paginate(start - displayCount)"
        href="#"
        >&lt; Prev</a
      >
    </div>
    <span><slot></slot> {{ start + 1 }} - {{ start + rows.length }}</span>
    <div>
      <a
        v-if="resultCount > displayCount"
        v-on:click.prevent="paginate(start + displayCount)"
        href="#"
        >Next &gt;</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Paginator",
  props: {
    initialStart: Number,
    displayCount: Number,
    resultCount: Number,
    rows: Array
  },
  data() {
    return {
      start: this.initialStart
    };
  },
  methods: {
    reset() {
      this.start = this.initialStart;
    },
    paginate(startRow) {
      this.start = startRow;
      this.$emit("paginate", startRow, this.displayCount);
    }
  }
};
</script>

<style lang="scss" scoped>
.paginator {
  font-size: 0.9em;
  display: flex;
  // justify-content: flex-end;
  justify-content: space-between;
  margin: 10px 0;

  span {
    line-height: 1.6em;
  }
  .paginator div {
    min-width: 100px;
  }
  a {
    margin: 0 10px;
    background: var(--color-nord-6);
    padding: 4px 20px;
    border-radius: 4px;
    transition: background 250ms ease-out;
  }
  a:hover {
    background: var(--color-nord-4);
    transition: background 250ms ease-out;
  }
}
</style>
