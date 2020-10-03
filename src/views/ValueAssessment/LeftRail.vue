<template lang="html">
  <section class="left-rail">
    <template v-if="props.type === 'list'">
      <div
        v-for="(row, i) in props.rows"
        :key="i"
        v-bind:class="currentLink === `${row.eventType}` ? 'selected' : ''"
        class="link"
        @click="linkClickHandler(row.eventType)"
      >
        {{ row.header }}
      </div>
    </template>
    <template v-if="props.type === 'panels'">
      <div>
        <v-expansion-panels v-model="panel" :accordion="true" :flat="true">
          <v-expansion-panel v-for="(content, i) in props.contentTypes" :key="i">
            <template v-if="content.type === 'radio'">
              <v-expansion-panel-header>
                {{ content.expansionHeader }}
              </v-expansion-panel-header>
              <v-expansion-panel-content class="main-form">
                <div class="radio-question" v-for="(question, i) in content.questions" :key="i">
                  <h5>{{ question.heading }}</h5>
                  <div class="question">
                    <label v-for="(label, i) in question.labels" :key="i">
                      <input type="radio" :value="label.value"
                        v-model="valueAssessment.form[label.formValueKey]" class="radio" />
                      {{ label.text }}</label>
                  </div>
                </div>
              </v-expansion-panel-content>
            </template>
            <template v-if="content.type === 'slider'">
              <v-expansion-panel-header>{{ content.expansionHeader }}
              </v-expansion-panel-header>
              <v-expansion-panel-content class="main-form">
                <div class="question slider-question" v-for="(question, i) in content.questions" :key="i">
                  <h5>{{ question.heading }}</h5>
                  <div class="slider">
                    <vue-slider :data="question.sliderData" :marks="true"
                      :value="valueAssessment.form[question.formValueKey]"></vue-slider>
                  </div>
                </div>
              </v-expansion-panel-content>
            </template>
            <template v-if="content.type === 'multiple'">
              <v-expansion-panel-header>{{ content.expansionHeader }}
              </v-expansion-panel-header>
              <div v-for="(row, i) in content.rows" :key="i">
                <v-expansion-panel-content class="main-form">
                  <template v-if="row.type === 'slider'">
                    <div class="question slider-question" v-for="(question, i) in row.questions" :key="i">
                      <h5>{{ question.heading }}</h5>
                      <div class="slider">
                        <vue-slider :data="question.sliderData" :marks="true"
                          :value="valueAssessment.form[question.formValueKey]"></vue-slider>
                      </div>
                    </div>
                  </template>
                  <template v-if="row.type === 'radio'">
                    <div class="radio-question" v-for="(question, i) in row.questions" :key="i">
                      <h5>{{ question.heading }}</h5>
                      <div class="question">
                        <label v-for="(label, i) in question.labels" :key="i">
                          <input type="radio" :value="label.value"
                            class="radio" v-model="valueAssessment.form[label.formValueKey]" />
                          {{ label.text }}</label>
                      </div>
                    </div>
                  </template>
                </v-expansion-panel-content>
              </div>
            </template>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>
              Market Segment
            </v-expansion-panel-header>
            <v-expansion-panel-content class="main-form">
              <div class="question slider-question">
                <h5>Sector</h5>
                <div class="slider">
                  <select class="col-md-12" @change="onSectorSelect($event)" v-model="valueAssessment.form.sector_id">
                    <option selected="selected" disabled>All Sectors</option>
                    <option v-for="(sector, index) in sectors" :key="index" v-bind:value="sector.id">
                      {{ sector.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="question slider-question">
                <h5>Industry</h5>
                <div class="slider">
                  <select class="col-md-12" v-model="valueAssessment.form.industry_id">
                    <option selected="selected" disabled>Select Industry</option>
                    <option v-for="(industry, index) in industries" :key="index" v-bind:value="industry.id">
                      {{ industry.name }}
                    </option>
                  </select>
                </div>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      
        <div class="footer">
          <button @click="clear">Clear</button>
          <button
            @click="
              $router
                .push({
                  name: 'value-assessment-result',
                  query: valueAssessment.form
                })
                .catch(() => {})
            "
          >
            Apply
          </button>
        </div>
      </div>
    </template>
  </section>
</template>

<script lang="js">
import { mapMutations, mapGetters, mapActions } from 'vuex'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import { HTTP } from "@/utils/http-service";

// import axios from "axios";

export default {
  name: 'LeftRail',
  components: {VueSlider},
   data: function () {
        return {
            sectors: [],
            industries: [],
            currentLink: 'politics', // This is to avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders.
            panel: 0,
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
              sector_id: null,
              industry_id: null
            }
        }
    },
  props: {
    props: {}    // this cause mutating a prop directly
  },
   computed: {
    ...mapGetters(["valueAssessment"]),
  },
  created() {
    this.fetchSectors()
  },
  methods: {
    ...mapMutations(["setValueAssessment"]),
    ...mapActions(["resetState"]),
        async fetchSectors() {
            try {
              let result = await HTTP.get('/sectors');
              if (result && result.data) {
                this.sectors = result.data;
              } else {
                this.sectors = [];
              }
            } catch (e) {
              console.error(e);
            }
          },
          async onSectorSelect(event) {
            try {
              let result = await HTTP.get(`/sectors/${event.target.value}/industries`);
              if (result && result.data) {
                this.industries = result.data;
              } else {
                this.industries = [];
              }
            } catch (e) {
              console.error(e);
            }
          },
    linkClickHandler(link) {
      this.currentLink = link
      this.$router.push(`/value-assessment/${link}`).catch(() => {});
    },
    clear() {
      localStorage.removeItem('companies');
      this.setValueAssessment(this.form)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/variables";
@import "../../assets/styles/typography";
@import "../../assets/styles/buttons";

.link {
  font-size: 14px;
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 40px;
  &.selected {
    background-color: $nord6;
    font-weight: 700;
    cursor: unset;
  }

  i {
    font-size: 14px;
    color: black;
    margin-left: 20px;
  }
}

.left-rail {
  background-color: white;
  flex: 1;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0;

  .v-expansion-panel-header__icon {
    margin-left: auto;
  }

  .v-expansion-panel-header {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 0.9375rem;
    line-height: 1;
    min-height: 48px;
    outline: none;
    padding: 15px 15px;
    position: relative;
    -webkit-transition: 0.3s min-height cubic-bezier(0.25, 0.8, 0.5, 1);
    transition: 0.3s min-height cubic-bezier(0.25, 0.8, 0.5, 1);
    width: 100%;
    color: #2a2a2a;
    font-weight: 600;
  }

  .v-expansion-panel-content__wrap {
    padding: 0 15px;
  }

  .vue-slider-ltr .vue-slider-mark-label {
    font-size: 10px !important;
    color: #808080;
  }

  .v-expansion-panel--active > .v-expansion-panel-header {
    //min-height: 30px;
  }

  .v-expansion-panel button {
    box-shadow: none;
    border-bottom: 1px solid #d9d9d9;
    border-radius: 0;
    padding: 0;
  }

  .vue-slider-dot-handle {
    background-color: #c30340;
  }

  .vue-slider-process {
    background-color: #808080 !important;
    border-radius: 15px;
  }

  .main-form {
    margin: 0;

    h5 {
      color: $deep-gray;
      font-size: 0.8em;
      font-family: $primary-font;
      font-weight: 600;
      line-height: 20px;
    }

    .question {
      display: flex;
      flex-direction: column;
      margin: 1em 0;
      justify-content: space-between;
    }

    &.slider-question {
      .slider {
        margin: 20px 10px 40px;
      }
    }

    .radio-question {
      background: white;
      border-radius: 20px;
      color: #828282;
      font-size: 16px;
      padding: 10px 0;
      margin-bottom: 0;

      label {
        display: flex;
        align-items: center;
        color: #919191;
        font-size: 0.8em;
        line-height: 2em;
      }

      .radio {
        --active: #3b3b3b;
        --active-inner: #fff;
        --focus: 2px rgba(39, 94, 254, 0.1);
        --border: #bbc1e1;
        --border-hover: #3b3b3b;
        --background: #fff;
        --disabled: #f6f8ff;
        --disabled-inner: #e1e6f9;
        -webkit-appearance: none;
        -moz-appearance: none;
        height: 21px;
        outline: none;
        display: inline-block;
        vertical-align: top;
        position: relative;
        margin: 0 10px 0 0;
        cursor: pointer;
        border: 1px solid var(--bc, var(--border));
        background: var(--b, var(--background));
        transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;

        &:after {
          content: "";
          display: block;
          left: 0;
          top: 0;
          position: absolute;
          transition: transform var(--d-t, 0.3s) var(--d-t-e, ease),
            opacity var(--d-o, 0.2s);
        }

        &:checked {
          --b: var(--active);
          --bc: var(--active);
          --d-o: 0.3s;
          --d-t: 0.6s;
          --d-t-e: cubic-bezier(0.2, 0.85, 0.32, 1.2);
        }

        &:disabled {
          --b: var(--disabled);
          cursor: not-allowed;
          opacity: 0.9;

          &:checked {
            --b: var(--disabled-inner);
            --bc: var(--border);
          }

          & + label {
            cursor: not-allowed;
          }
        }

        &:hover {
          &:not(:checked) {
            &:not(:disabled) {
              --bc: var(--border-hover);
            }
          }
        }

        &:focus {
          box-shadow: 0 0 0 var(--focus);
        }

        &:not(.switch) {
          width: 21px;

          &:after {
            opacity: var(--o, 0);
          }

          &:checked {
            --o: 1;
          }
        }

        & + label {
          font-size: 14px;
          line-height: 21px;
          display: inline-block;
          vertical-align: top;
          cursor: pointer;
          margin-left: 4px;
        }

        border-radius: 50%;

        &:after {
          width: 19px;
          height: 19px;
          border-radius: 50%;
          background: var(--active-inner);
          opacity: 0;
          transform: scale(var(--s, 0.7));
        }

        &:checked {
          --s: 0.3;
        }
      }
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    margin: 30px 0;

    button {
      cursor: pointer;
      height: 35px;
      border-radius: 0;

      &:nth-of-type(1) {
        background: white;
        color: #c30340;
        border: 1px solid #c30340;
        margin-right: 20px;
        padding: 7px 35px;
        font-size: 15px;
      }

      &:nth-of-type(2) {
        background: #c30340;
        color: white;
        padding: 0 40px;
        font-size: 14px;
      }
    }
  }
}
</style>
