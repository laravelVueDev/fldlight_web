<template>
  <section class="comparison">
    <div class="container container-fluid">
      <div class="row end-xs">
        <div class="col-xs-4">
          <QuickSearch
            v-if="companies.length < 5"
            apiEndpoint="/companies"
            v-bind:onSelectResult="onSelectResult"
            placeholder="Enter keyword or symbol to add to compare"
          />
        </div>
      </div>
      <div class="comparison-header">
        <div class="header-item"></div>
        <div class="header-item" v-for="(item, i) in companies" :key="i">
          <div class="row">
            <div class="col-xs-8">
              <h4 class="heading">
                {{ item.symbol }}
              </h4>
            </div>
            <div class="col-xs-4">
              <span @click="crossClickHandler(i)">
                <img
                  class="close-icon"
                  src="@/assets/images/close-icon.png"
                  height="18"
                  width="18"
                />
              </span>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12">
              <span>{{ item.company_name }}</span>
            </div>
          </div>
          <div class="row center-xs bottom-xs">
            <div class="col">
              <router-link v-bind:to="url(item)">
                <button class="btn btn--primary">View details</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <v-expansion-panels
        multiple
        v-model="panel"
        :accordion="true"
        :flat="true"
      >
        <v-expansion-panel>
          <v-expansion-panel-header
            ><span>Political Affiliation</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content v-show="comparisonItemsLoaded()">
            <div class="left-head">Political Tilt</div>
            <div v-for="(item, i) in companies" :key="i + 5">
              {{
                comparisonItems[item.company_id].politicalAffiliationAttributes
                  .political_tilt
              }}
            </div>
          </v-expansion-panel-content>
          <v-expansion-panel-content v-show="comparisonItemsLoaded()">
            <div class="left-head">
              Number of contributions where employees have contributed with a
              balanced allocation between Democrat and Republican (within 3%)
            </div>
            <div v-for="(item, i) in companies" :key="i">
              {{
                parseInt(
                  comparisonItems[item.company_id]
                    .politicalAffiliationAttributes
                    .employee_balanced_contributions_count
                ).toLocaleString()
              }}
            </div>
          </v-expansion-panel-content>
          <v-expansion-panel-content v-show="comparisonItemsLoaded()">
            <div class="left-head">
              Employee contributions in the last 12 years
            </div>
            <div v-for="(item, i) in companies" :key="i">
              {{
                format(
                  comparisonItems[item.company_id]
                    .politicalAffiliationAttributes
                    .employee_contributions_12_year,
                  "currency"
                )
              }}
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header
            ><span>Environment sustainability</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content v-show="comparisonItemsLoaded()">
            <div class="left-head">
              Air violations
            </div>
            <div v-for="(item, i) in companies" :key="i">
              {{
                format(
                  comparisonItems[item.company_id].environmentalAttributes
                    .caa_last_penalty_amt_cdf
                )
              }}
            </div>
          </v-expansion-panel-content>
          <v-expansion-panel-content v-show="comparisonItemsLoaded()">
            <div class="left-head">
              Water violations
            </div>
            <div v-for="(item, i) in companies" :key="i">
              {{
                format(
                  comparisonItems[item.company_id].environmentalAttributes
                    .cwa_last_penalty_amt_cdf
                )
              }}
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <span>Market Segment</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content v-show="comparisonItemsLoaded()">
            <div class="left-head">
               Sectors 
              </div>
              <div v-for="(item, i) in companies" :key="i">
                  {{ item.sector }}
              </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <!--        <v-expansion-panel>-->
        <!--          <v-expansion-panel-header-->
        <!--            ><span>Diversity</span></v-expansion-panel-header-->
        <!--          >-->
        <!--          <v-expansion-panel-content>-->
        <!--            <div></div>-->
        <!--          </v-expansion-panel-content>-->
        <!--        </v-expansion-panel>-->
      </v-expansion-panels>

      <!--      <div class="footer">-->
      <!--        <button>Print to pdf</button>-->
      <!--        <button>Save to your account</button>-->
      <!--      </div>-->
    </div>
  </section>
</template>

<script lang="js">
import QuickSearch from "@/components/QuickSearch";
import {HTTP} from "@/utils/http-service";
import format from "@/utils/number-format.js";

export default {
  name: "Comparison",
  components: {
    QuickSearch
  },
  data() {
    return {
      panel: [0, 1],
      companies: JSON.parse(localStorage.getItem('companies')),
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      select: [],
      isLoading: false,
      items: [],
      model: null,
      search: null,
      comparisonItems: {},
      maxWidth: 40
    }
  },
  watch: {
      model (val) {
        if(!this.companies) {
          let newCompanies = [];
          newCompanies.push(this.convertToStandardForm(val))
          localStorage.setItem('companies', JSON.stringify(newCompanies))
          this.companies = newCompanies
        }
        this.companies.push(this.convertToStandardForm(val))
        localStorage.setItem('companies', JSON.stringify(this.companies))
        this.items = []
      },
  },
  beforeMount() {
    this.companies.forEach(company => {
      this.comparisonItems[company.company_id] = {
        politicalAffiliationAttributes: {
          political_tilt: null,
          employee_contributions_12_year: null,
          employee_balanced_contributions_count: 0,
        },
        environmentalAttributes: {
          caa_last_penalty_amt_cdf: null,
          cwa_last_penalty_amt_cdf: null,
        }
      };
    });

    this.getScreenerAttributes();
  },
  methods: {
    stubComparisonItem(company) {
      this.comparisonItems[company.company_id] = {
        politicalAffiliationAttributes: {
          political_tilt: null,
          employee_contributions_12_year: null,
          employee_balanced_contributions_count: 0,
        },
        environmentalAttributes: {
          caa_last_penalty_amt_cdf: null,
          cwa_last_penalty_amt_cdf: null,
        }
      };
    },
    comparisonItemsLoaded() {
      return !!Object.keys(this.comparisonItems).length;
    },
    crossClickHandler(i) {
      const companyId = this.companies[i].company_id;
      delete this.comparisonItems[companyId];
      this.companies.splice(i, 1)
      localStorage.setItem('companies', JSON.stringify(this.companies))
    },
    convertToStandardForm(obj) {
      obj['company_id'] = obj['id'];
      obj['company_name'] = obj['name'];
      obj['company_symbol'] = obj['ticker'];
      obj['symbol'] = obj['company_symbol'] = obj['ticker'];
      return obj;
    },
    onSelectResult(company) {
      const comparisonCompany = this.convertToStandardForm(company);
      this.stubComparisonItem(comparisonCompany);
      this.companies.push(comparisonCompany);
      localStorage.setItem('companies', JSON.stringify(this.companies));
      this.getScreenerAttributes();
    },
    url(company) {
      this.$ga.event("screener", "comparisonItem.navigate", company.symbol);
      return `/companies/${company.symbol}`;
    },
    async getScreenerAttributes() {
      const companyIds = this.companies.map(company => company.company_id);

      try {
        const results = await HTTP.get(`/comparisons?companyIds=${companyIds}`);

        results.data.forEach((result) => {
          const company = this.companies.find(company => company.company_id === result.company_id);

          this.comparisonItems[result.company_id] = {
            companyName: company.company_name,
            symbol: company.symbol,
            politicalAffiliationAttributes: {
              political_tilt: result.political_tilt,
              employee_contributions_12_year: result.employee_contributions_12_year,
              employee_balanced_contributions_count: result.employee_balanced_contributions_count
            },
            environmentalAttributes: {
              caa_last_penalty_amt_cdf: result.caa_last_penalty_amt_cdf,
              cwa_last_penalty_amt_cdf: result.cwa_last_penalty_amt_cdf
            }
          };
        });

        this.$forceUpdate();

      } catch (e) {
        console.error(e);
      }
    },
    format: format
  }
}
</script>

<style lang="scss">
.comparison {
  background-color: $nord6;

  .comparison-header {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    background: white;
    padding-top: 5px;

    .header-item {
      border-right: 2px solid #cfcfcf;
      border-bottom: 2px solid #cfcfcf;
      padding: 15px 10px;

      &:last-of-type {
        border-right: unset;
      }

      .heading {
        margin-bottom: 0.6em;
      }

      .row:nth-of-type(2) {
        min-height: 50px;
      }
    }

    h4 {
      margin-bottom: 0;
    }

    .close-icon {
      margin: 0.3em;
      cursor: pointer;
    }
  }

  .v-expansion-panel-header {
    background-color: #e6e6e6;
    color: #242424;
    border: none;
    box-shadow: none;
    border-radius: 0;
    padding: 15px 15px;
    font-weight: 600;
  }

  .v-expansion-panel-header__icon {
    margin-left: unset !important;
  }

  .v-expansion-panel-header > *:not(.v-expansion-panel-header__icon) {
    flex: unset;
  }

  .v-expansion-panel-content__wrap {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    padding: unset;
    border-bottom: 2px solid lightgray;

    div {
      border-right: 2px solid lightgray;
      font-size: 14px;
      padding: 10px 22px;

      &.left-head {
        font-weight: 600;
      }

      &:last-of-type {
        border-right: unset;
      }
    }
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 40px;
    height: 40px;

    button {
      font-size: 12px;
      height: auto;
      cursor: pointer;
      width: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    button:nth-of-type(1) {
      margin-right: 20px;
      background: white;
      color: #b53648;
      border: 1px solid #b53648;
      padding: 8px 20px;
      width: 150px;
      box-shadow: none;
    }

    button:nth-of-type(2) {
      background: #b53648;
      color: white;
      padding: 15px 20px;
      box-shadow: none;
      width: 170px;
    }
  }

  button:focus {
    outline: none;
  }
}

.v-expansion-panel--active > .v-expansion-panel-header {
  min-height: auto;
}

.theme--light.v-expansion-panels
  .v-expansion-panel-header
  .v-expansion-panel-header__icon
  .v-icon {
  color: #242424;
}
</style>
