<template lang="html">
  <div class="quick-search">
    <form @submit.prevent="search">
      <input
        type="search"
        class="quick-search__input"
        :placeholder="placeholderText"
        v-model="searchText"
        @input="onInputChange"
        @keyup.up="keyUp"
        @keyup.down="keyDown"
        @keyup.enter="keyEnter"
        @click="open"
      />
    </form>
    <div
      v-on-click-outside="close"
      v-if="showList"
      class="quick-search__results"
    >
      <div v-if="isLoading" class="progress">
        <div class="indeterminate"></div>
      </div>
      <div
        class="response"
        v-if="responseText !== '' && !!searchText && !isLoading"
      >
        {{ responseText }}
      </div>
      <table v-if="show" class="quick-search__results-table">
        <tr
          class="result"
          v-bind:key="i"
          v-for="(resultItem, i) in results"
          :class="{ active: i === selectedIndex }"
          @mouseover="selectedIndex = i"
          @click="keyEnter"
        >
          <td class="result__ticker">{{ resultItem.ticker }}</td>
          <td class="result__name">{{ resultItem.name }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="js">
  import { debounce } from "@/utils/debounce"
  import { mixin as onClickOutside } from "@/directives/click-outside"
  import { mapMutations } from "vuex"
  import selectn from "selectn";

  export default {
    name: 'quick-search',
    props: {
      apiEndpoint: String,
      placeholder: String,
      onSelectResult: Function
    },
    mixins: [onClickOutside],
    data () {
      return {
        searchText: '',
        selectedIndex: 0,
        results: [],
        isLoading: false,
        showList: false,
        responseText: String,
      }
    },
    watch: {},
    created() {
      this.debounceSearch = debounce(this.search, 500);
    },
    methods: {
      ...mapMutations(["addToSearchHistory"]),
      onInputChange() {
        this.responseText = '';
        this.selectedIndex = 0;
        this.debounceSearch();
      },
      async search() {
        this.isLoading = true;
        this.showList = true;
        const baseURI = (this.apiEndpoint)
            ? `${this.apiEndpoint}?q=${this.searchText}`
            : `/search?q=${this.searchText}`;

        try {
          const response = await this.$http.get(baseURI);
          this.results = response.data.data;
          this.isLoading = false;

          if (!this.results.length) {
            this.responseText = 'No results found';
          }
        }
        catch (e) {
          this.responseText = 'Something went wrong... Please try again';
        }
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
          if (this.onSelectResult){
            this.onSelectResult(selectedItem);
          } else {
            this.navigateToItem(selectedItem);
          }
          this.showList = false
        }
      },
      navigateToItem(selectedItem) {
        const resultIndex = selectn('resultIndex', selectedItem);
        const ticker = selectn('ticker', selectedItem);
        const isNewTicker = ticker && ticker !== this.$route.params.ticker;
        const baseRoute = (resultIndex === 'companies') ? 'company' : 'fund';

        if (isNewTicker) {
          if (resultIndex === 'companies'){
            this.addToSearchHistory(selectedItem);
          }

          this.$router.push({
            name: baseRoute,
            params: {
              ticker: ticker,
            }
          })
        }
        this.clearSearch()
      },
      itemView(item) {
        if (item && item.scrollIntoView) {
          item.scrollIntoView(false);
        }
      },
      clearSearch() {
        this.results = [];
        this.searchText = '';
        this.responseText = '';
        this.showList = false
      },
      close() {
        this.showList = false
      },
      open() {
        this.showList = true
      }
    },
    computed: {
      hasItems () {
        return !!this.results.length;
      },
      show () {
        return (this.showList && this.hasItems)
      },
      placeholderText(){
        return this.placeholder || "Search for a ticker or company name";
      }
    }
}
</script>

<style scoped lang="scss">
.quick-search {
  flex: 1;
  max-width: 450px;
  min-width: 300px;
  position: relative;
  text-align: left;

  &__input {
    border-radius: 0;
    box-shadow: none;
    border: none;
  }

  &__results {
    z-index: 1;
    border-top: 2px solid $gray8;
    position: absolute;
    top: 100%;
    background-color: $white;
    width: calc(100% - 1px);
    box-shadow: 0px 5px 7px -1px $gray3;
  }

  &__results-table {
    width: 100%;
  }

  .result {
    border-bottom: 1px solid $gray8;
    &:last-of-type {
      border: none;
    }
    &__ticker {
      font-weight: 600;
      color: $blue;
      padding: 0.5rem;
    }
    &__name {
      color: $gray0;
      padding: 0.5rem;
    }
    &.active {
      cursor: pointer;
      background-color: $gray8;
    }
  }

  .response {
    padding: 0.5rem 0.75rem;
  }

  .progress {
    position: absolute;
    top: -0.33rem;
  }
}
</style>
