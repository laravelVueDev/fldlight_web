import { HTTP } from "@/utils/http-service";

const state = {
  companyOfTheDay: {
    ticker: "",
    name: "",
    sector: "",
    industry: "",
    politics: {
      contributions: {
        contributingEmployeeCount: 0,
        total: 0,
        REP: {},
        DEM: {},
        Other: {},
        years: []
      }
    }
  }
};

const actions = {
  async getCompanyOfTheDay(context) {
    try {
      let response = await HTTP.get("/company/of-the-day");
      context.commit("setCompanyOfTheDay", response.data);
    } catch (e) {
      console.error(e);
    }
  }
};

const mutations = {
  setCompanyOfTheDay(state, payload) {
    state.companyOfTheDay = payload;
  }
};

const getters = {
  companyOfTheDay: state => {
    return state.companyOfTheDay;
  }
};

export const companyOfTheDayStore = {
  state,
  actions,
  mutations,
  getters
};
