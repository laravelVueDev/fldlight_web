<template lang="html">
  <section class="screener-result">
    <leftRail v-bind:props="leftRailProps" />
    <section class="main-area">
      <h2>Assessment Results</h2>
      <div v-if="!results.data.length">
        <h4>No results found</h4>
      </div>
      <div v-else>
        <div class="add-btn">
          <button @click="addToCompareHandler">Add to compare</button>
        </div>
        <div class="grid-head">
          <span></span>
          <span><b>Symbol</b></span>
          <span><b>Name</b></span>
        </div>
        <div class="grid-item" v-for="(item, i) in results.data" :key="i">
          <label>
            <input
              type="checkbox"
              v-model="items"
              :value="item"
              :disabled="items.length > 4 && items.indexOf(item) === -1"
            />
          </label>
          <span>
            <router-link :to="`/companies/${item.symbol}`">{{
              item.symbol
            }}</router-link></span
          >
          <span>{{ item.company_name }}</span>
        </div>
      </div>
    </section>
  </section>
</template>

<script lang="js">
import LeftRail from "./LeftRail";
import { HTTP } from "@/utils/http-service";
import { mapGetters } from 'vuex';



export default {
  name: "Result",
  components: { LeftRail },
  data() {
    return {
      items: [],
      page: 1,
      companiesCount: 0,
      results: {
        data: [],
      },
      assessment: {
        employee_balanced_contributions_count: null,
        employee_contributions_12_year: null,
        tilt: 'UNAFFILIATED',
        env_air: 'any',
        env_water: 'any',
        env_hazmat: 'any',
        sector_id: null,
        industry_id: null
      },
       environmentalLabels: {
        sliderRange: ['few', 'moderate', 'any']
      },
       leftRailProps : {
        type: "panels",
        contentTypes: [
                  {
                    type: 'radio',
                    expansionHeader: 'Political Affilation',
                    questions: [
                    {
                        heading: 'Political tilt',
                        labels: [
                            {
                                text: 'with an Unaffiliated tilt',
                                value: 'UNAFFILIATED',
                                formValueKey: 'tilt'
                            },
                            {
                                text: 'with a Democratic tilt',
                                value: 'DEM',
                                formValueKey: 'tilt'
                            },
                            {
                                text: 'with a Republican tilt',
                                value: 'REP',
                                formValueKey: 'tilt'
                            },
                        ],
                    },
                    {
                        heading:'Employee contributions in the last 12 years',
                        labels: [
                            {
                                text: 'less than $2 million',
                                value: 'small',
                                formValueKey: 'employee_contributions_12_year'
                            },
                            {
                                text: '$2-$25 million',
                                value: 'medium',
                                formValueKey: 'employee_contributions_12_year'
                            },
                            {
                                text: 'more than $25 million',
                                value: 'large',
                                formValueKey: 'employee_contributions_12_year'
                            },
                        ],
                    },
                    {
                        heading:'Where employees have contributed with a balanced allocation between Democrat and Republican (within 3%)',
                        labels: [
                            {
                                text:  'few',
                                value: 'few',
                                formValueKey: 'employee_balanced_contributions_count'
                            },
                            {
                                text: 'moderate',
                                value: 'moderate',
                                formValueKey: 'employee_balanced_contributions_count'
                            },
                            {
                                text:  'any',
                                value: 'any',
                                formValueKey: 'employee_balanced_contributions_count'
                            },
                        ],
                    },
                ]
              },
              {
                type: 'slider',
                expansionHeader: 'Environmental Sustainability',
                questions: [
                    {
                      heading: 'Air Violations',
                      sliderData: ['few', 'moderate', 'any'],
                      formValueKey: 'env_air',
                    },
                    {
                      heading: 'Water violations',
                      sliderData: ['few', 'moderate', 'any'],
                      formValueKey: 'env_water',
                    }
                  ]
              },
              {
                type: 'multiple',
                expansionHeader: 'Gender Diversity',
                rows: [
                  {
                type: 'slider',
                questions: [
                    {
                      heading: 'I want to see investments with ________ gender diversity on the Board of directors.',
                      sliderData: ['0-20%', '21-40%', '41-60%'],
                      formValueKey: 'gd_board_directors',
                    },
                    {
                      heading: 'I want to see investments with ________ gender diversity at the Executive level.',
                      sliderData: ['0-20%', '21-40%', '41-60%'],
                      formValueKey: 'gd_executive_level',
                    },
                    {
                      heading: 'I want to see investments with ________ gender diversity at the Senior Managment level.',
                      sliderData: ['0-20%', '21-40%', '41-60%'],
                      formValueKey: 'gd_senior_mgt_level'
                    },
                    {
                      heading: 'I want to see investments with ________ gender diverse workforce.(**EA to add definitions).',
                      sliderData: ['0-20%', '21-40%', '41-60%'],
                      formValueKey: 'gd_workforce'
                    },
                ],
              },
                  {
                    type: 'radio',
                    questions: [
                    {
                        heading: 'I want to see investments with a commitment to ensure payment of a living wage to all employess.',
                        labels: [
                            {
                                text: 'yes, this is an investment priority to me',
                                value: 'Y',
                                formValueKey: 'gd_living_wage'
                            },
                            {
                                text: 'no, this is not an investment priority to me',
                                value: 'N',
                                formValueKey: 'gd_living_wage'
                            },
                        ],
                    },
                    {
                        heading: 'I want to see investments has published gender segrated pay information or on overall gender pay gap analysis in company reports or filings.',
                        labels: [
                            {
                                text: 'yes, this is an investment priority to me',
                                value: 'Y',
                                formValueKey: 'eq_pay_pub'
                            },
                            {
                                text: 'no, this is not an investment priority to me',
                                value: 'N',
                                formValueKey: 'eq_pay_pub'
                            },
                        ],
                    },
                    {
                        heading: 'I want to see investments has published gender segrated pay information for at least 3 job classifications.',
                        labels: [
                            {
                                text: 'yes, this is an investment priority to me',
                                value: 'Y',
                                formValueKey: 'eq_pay_pub_3'
                            },
                            {
                                text: 'no, this is not an investment priority to me',
                                value: 'N',
                                formValueKey: 'eq_pay_pub_3'
                            },
                        ],
                    },
                    {
                        heading: 'I want to see investments has a strategy with specific activites to close any gender pay gap.',
                        labels: [
                            {
                                text: 'yes, this is an investment priority to me',
                                value: 'Y',
                                formValueKey: 'eq_pay_strat'
                            },
                            {
                                text: 'no, this is not an investment priority to me',
                                value: 'N',
                                formValueKey: 'eq_pay_strat'
                            },
                        ],
                    },
                    {
                        heading: 'I want to see investments in companies with an overall gender pay gap of less than or equal to 3 percent.',
                        labels: [
                            {
                                text: 'yes, this is an investment priority to me',
                                value: 'Y',
                                formValueKey: 'eq_pay_gap'
                            },
                            {
                                text: 'no, this is not an investment priority to me',
                                value: 'N',
                                formValueKey: 'eq_pay_gap'
                            },
                        ],
                    },
                    {
                        heading: 'I want to see investments in companies that provide equal pay for equal work in at least 3 job classifications.',
                        labels: [
                            {
                                text: 'yes, this is an investment priority to me',
                                value: 'Y',
                                formValueKey: 'eq_pay_gap3'
                            },
                            {
                                text: 'no, this is not an investment priority to me',
                                value: 'N',
                                formValueKey: 'eq_pay_gap3'
                            },
                        ],
                    },
                ],
              },
            ],
          },
        ]
}
    }
  },

  mounted() {
    if (localStorage.getItem('companies')){
      this.items = JSON.parse(localStorage.getItem('companies'));
    }

    this.fetchAssessmentResult();
  },
  watch: {
    $route() {
      this.fetchAssessmentResult();
    }
  },
  computed: {
    ...mapGetters(["valueAssessment"]),
  },
  methods: {
    async fetchAssessmentResult(page = 1) {
      const queryParams = this.$route.query;
      if (queryParams.sector == "All Sectors") {
        queryParams.sector = null;
      }
      this.assessment = Object.assign(this.assessment, queryParams);
      if (queryParams.sector_id == "All Sectors") {
        queryParams.sector_id = null;
      }
      if(queryParams.industry_id == "All Industries") {
        queryParams.industry_id = null;
      }
     const offset = page === 1 ? 0 : (page - 1) * 10;
     try {
        let result = await HTTP.post(`/assessment?offset=${offset}`, this.assessment);
         if (result && result.data) {
          this.results.data = result.data.data;
          this.companiesCount = Math.floor(result.data.count / 10);
        } else {
          this.results.data = [];
        }
      } catch (e) {
        console.error(e);
      }
    },

    addToCompareHandler() {
      localStorage.setItem('companies', JSON.stringify(this.items))
      this.$router.push({ name: 'value-assessment-comparison', query: this.form }).catch(()=>{})
    },

    async fetchCompaniesCount() {
      try {
        let count = await HTTP.get("/assessment-count")
        this.companiesCount = Math.floor(count/10)
      } catch (e) {
        console.error(e);
      }
    },

    applyClickHandler() {
      // localStorage.removeItem('companies');
      // this.fetchAssessmentResult();
    },

    clearClickhandler() {
      this.$router.replace({'query': null});
      this.applyClickHandler()
    }
  },


};
</script>

<style scoped lang="scss">
.screener-result {
  display: flex;
  background-color: $nord6;

  .main-area {
    padding: 20px;
    flex: 4;

    .add-btn {
      text-align: right;

      button {
        background: #c30340;
        color: white;
        padding: 12px 20px;
        height: auto;
        font-size: 12px;
        border-radius: 5px;
      }
    }

    .grid-head,
    .grid-item {
      display: grid;
      grid-template-columns: 50px 100px auto;
      align-items: center;
    }

    .grid-head {
      padding: 0 10px;

      span {
        margin-bottom: 0.5em;
      }
    }

    .grid-item {
      background: white;
      border-radius: 0.25rem;
      margin-top: 5px;
      margin-bottom: 5px;
      padding: 15px 10px;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;

      input {
        width: 1.1em;
        height: 1.1em;
        border: none;
        border-radius: 0.25rem;
        background-color: #fff;
        box-shadow: none;
      }
    }
  }
}
</style>
