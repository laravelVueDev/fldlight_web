<template lang="html">
  <section class="left-rail">
    <v-expansion-panels v-model="panel" :accordion="true" :flat="true">
      <v-expansion-panel>
        <v-expansion-panel-header
          >Political Affiliation
        </v-expansion-panel-header>
        <v-expansion-panel-content class="main-form">
          <div class="radio-question">
            <h5>Political tilt</h5>
            <div class="question">
              <label
                ><input
                  type="radio"
                  value="UNAFFILIATED"
                  v-model="valueAssessment.form.tilt"
                  class="radio"
                />
                with an Unaffiliated tilt</label
              >
              <label
                ><input
                  type="radio"
                  value="DEM"
                  v-model="valueAssessment.form.tilt"
                  class="radio"
                />
                with a Democratic tilt</label
              >
              <label
                ><input
                  type="radio"
                  value="REP"
                  v-model="valueAssessment.form.tilt"
                  class="radio"
                />
                with a Republican tilt</label
              >
            </div>
          </div>
          <div class="radio-question">
            <h5>
              Employee contributions in the last 12 years
            </h5>
            <div class="question">
              <label
                ><input
                  type="radio"
                  value="small"
                  v-model="valueAssessment.form.employee_contributions_12_year"
                  class="radio"
                />
                less than $2 million</label
              >
              <label
                ><input
                  type="radio"
                  value="medium"
                  v-model="valueAssessment.form.employee_contributions_12_year"
                  class="radio"
                />
                $2-$25 million</label
              >
              <label
                ><input
                  type="radio"
                  value="large"
                  v-model="valueAssessment.form.employee_contributions_12_year"
                  class="radio"
                />
                more than $25 million</label
              >
            </div>
          </div>
          <div class="radio-question">
            <h5>
              Where employees have contributed with a balanced allocation
              between Democrat and Republican (within 3%)
            </h5>
            <div class="question">
              <label
                ><input
                  type="radio"
                  value="few"
                  v-model="
                    valueAssessment.form.employee_balanced_contributions_count
                  "
                  class="radio"
                />
                few</label
              >
              <label
                ><input
                  type="radio"
                  value="moderate"
                  v-model="
                    valueAssessment.form.employee_balanced_contributions_count
                  "
                  class="radio"
                />
                moderate</label
              >
              <label
                ><input
                  type="radio"
                  value="any"
                  v-model="
                    valueAssessment.form.employee_balanced_contributions_count
                  "
                  class="radio"
                />
                any</label
              >
            </div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header
          >Environmental Sustainability
        </v-expansion-panel-header>
        <v-expansion-panel-content class="main-form">
          <div class="question slider-question">
            <h5>Air violations</h5>
            <div class="slider">
              <vue-slider
                :data="environmentalLabels.sliderRange"
                :marks="true"
                v-model="valueAssessment.form.env_air"
              ></vue-slider>
            </div>
          </div>
          <div class="question slider-question">
            <h5>Water violations</h5>
            <div class="slider">
              <vue-slider
                :data="environmentalLabels.sliderRange"
                :marks="true"
                v-model="valueAssessment.form.env_water"
              ></vue-slider>
            </div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
   <!-- <v-expansion-panel>
        <v-expansion-panel-header
          >Supply Chain Transparency
        </v-expansion-panel-header>
        <v-expansion-panel-content></v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Diversity</v-expansion-panel-header>
        <v-expansion-panel-content></v-expansion-panel-content>
      </v-expansion-panel> -->
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
  </section>
</template>

<script lang="js">
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  name: "ResultLeftRail",
  components: {VueSlider},
  data() {
    return {
      panel: 0,
      politicalAffiliationLabels: {
        sliderRange: ['less than $2 million', '$2-$25 million', 'more than $25 million']
      },
      environmentalLabels: {
        sliderRange: ['few', 'moderate', 'any']
      }
    }
  },
  computed: {
    ...mapGetters(["valueAssessment"]),
  },
  
  methods: {
    ...mapMutations(["setValueAssessment"]),
    ...mapActions(["resetState"]),
    clear() {
      localStorage.removeItem('companies');
      this.$emit('clearClicked', '');
      this.form = {
        contribution: 'any',
        tilt: null,
        env_air: 'any',
        env_water: 'any',
        sector:"All Sectors"
      };
      this.setValueAssessment(this.form)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/variables";
@import "../../assets/styles/typography";
@import "../../assets/styles/buttons";

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
