import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import { accountStore } from "./account";
import { searchStore } from "./search";
import { companyOfTheDayStore } from "./company-of-the-day";
import { valueAssessmentStore } from "./value-assessment";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    accountStore,
    searchStore,
    companyOfTheDayStore,
    valueAssessmentStore
  },
  plugins: [
    createPersistedState({
      paths: ["searchStore"]
    })
  ]
});
