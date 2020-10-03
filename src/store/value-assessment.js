const state = {
  valueAssessment: {
    form: {
      employee_contributions_12_year: null,
      employee_balanced_contributions_count: null,
      tilt: null,
      env_water: "",
      env_air: "",
      gd_board_directors: "",
      gd_executive_level: "",
      gd_senior_mgt_level: "",
      gd_workforce: "",
      gd_living_wage: "",
      eq_pay_pub: "",
      eq_pay_pub_3: "",
      eq_pay_strat: "",
      eq_pay_gap: "",
      eq_pay_gap3: "",
      paid_leave_progm: "",
      sector_id: "All Sectors",
      industry_id: "Select Industry"
    }
  }
};

const actions = {
  resetValueAssessmentState({ commit }) {
    commit("resetState");
  },
};

const mutations = {
  resetState(state) {
    Object.assign(state, state)
  },
  setValueAssessment(state, payload) {
    state.valueAssessment.form = payload;
  }
};

const getters = {
  valueAssessment: state => {
    return state.valueAssessment;
  }
};

export const valueAssessmentStore = {
  state,
  actions,
  mutations,
  getters
};
