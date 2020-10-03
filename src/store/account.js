// User account & signup/registration functionality

const state = {
  selectedPlan: {},
  company: "",
  subscriptionActivated: false,
  subscription: {}
};

const actions = {};

const mutations = {
  setCompany(state, payload) {
    state.company = payload;
  },
  setSelectedPlan(state, payload) {
    state.selectedPlan = payload;
  },
  setSubscriptionActivated(state, payload) {
    state.subscriptionActivated = payload;
  },
  setSubscription(state, payload) {
    state.subscription = payload;
  }
};

const getters = {
  company: state => {
    return state.company;
  },
  selectedPlan: state => {
    return state.selectedPlan;
  },
  subscriptionActivated: state => {
    return state.subscriptionActivated;
  },
  subscription: state => {
    return state.subscription;
  }
};

export const accountStore = {
  state,
  actions,
  mutations,
  getters
};
