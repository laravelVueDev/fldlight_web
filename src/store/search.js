// Quick Search Functionality

const state = {
  searchHistory: []
};

const actions = {};

const mutations = {
  addToSearchHistory(state, payload) {
    state.searchHistory.push(payload);
  }
};

const getters = {
  recentSearches: state => {
    return state.searchHistory.slice(
      Math.max(state.searchHistory.length - 5, 0)
    );
  }
};

export const searchStore = {
  state,
  actions,
  mutations,
  getters
};
