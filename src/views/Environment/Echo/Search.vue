<template lang="html">
  <div class="search">
    <form @submit.prevent="search">
      <input
        type="search"
        class="search__input"
        placeholder="Search for a facility"
        v-model="searchText"
        @input="onInputChange"
        @keyup.up="keyUp"
        @keyup.down="keyDown"
        @keyup.enter="keyEnter"
      />
    </form>
  </div>
</template>

<script lang="js">
  import { debounce } from "@/utils/debounce"

  export default {
    name: 'Search',
    data () {
      return {
        searchText: '',
        results: [],
        isLoading: false
      }
    },
    created() {
      this.debounceSearch = debounce(this.search, 300);
    },
    methods: {
      onInputChange() {
        this.responseText = '';
        this.debounceSearch();
      },
      async search() {
        this.$emit("search", this.searchText);
      },
      keyUp() {
        if (this.selectedIndex > 0) {
          this.selectedIndex--;
          this.itemView(this.$el.getElementsByClassName('result')[this.selectedIndex]);
        }
      },
      keyDown() {
        if (this.selectedIndex < (this.results.length - 1)) {
          this.selectedIndex++;
          this.itemView(this.$el.getElementsByClassName('result')[this.selectedIndex]);
        }
      },
      keyEnter() {
        const selectedItem = this.results[this.selectedIndex] || this.results[0];

        if (this.showList) {
          this.onSelectResult(selectedItem);
          this.showList = false
        }
      }
    }
}
</script>

<style scoped lang="scss">
.search {
  flex: 1;
  max-width: 450px;
  min-width: 300px;
  position: relative;
  text-align: left;

  &__input {
    border-radius: 0;
  }
}
</style>
