<template lang="html">
  <div>
    <h2>Political Affiliation</h2>
    <p>
      Floodlight aggregates all political contributions originating from
      employees of US-based publicly traded companies and their subsidiaries, as
      well as the political action committees directly associated with those
      firms. The aim is to allow investors to better understand how their
      investment dollars are directly and indirectly contributing to political
      parties and candidates in US Presidential, Senate, and House races.
    </p>

    <div class="main-form">
      <div class="question radio-question">
        <h5>I want to see investments...</h5>
        <div class="response-controls">
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
          <label
            ><input
              type="radio"
              value="UNAFFILIATED"
              v-model="valueAssessment.form.tilt"
              class="radio"
            />
            with an Unaffiliated tilt</label
          >
        </div>
      </div>
      <div class="question radio-question">
        <h5>
          I want to see investments where employees have contributed __________
          in the last 12 years:
        </h5>
        <div class="response-controls">
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
      <div class="question radio-question">
        <h5>
          I want to see investments where employees have contributed with a
          balanced allocation between Democrat and Republican (within 3%)
        </h5>
        <div class="response-controls">
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
    </div>
  </div>
</template>

<script lang="js">
  import 'vue-slider-component/theme/default.css'
  import { mapMutations, mapGetters } from 'vuex'

  export default {
  name: "index",
  data() {
    return {
      form: {
        tilt: null,
        employee_contributions_12_year: null,
        employee_balanced_contributions_count: null,
      }
    }
  },
  computed: {
    ...mapGetters(["valueAssessment"]),
  },
  methods: {
    ...mapMutations(["setValueAssessment"])
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/variables";
@import "../../assets/styles/typography";
@import "../../assets/styles/buttons";
.screener {
  display: flex;
  background-color: $nord6;

  .main-area {
    padding: 20px 80px;
    flex: 3;

    .question-group {
      display: none;
    }

    .active {
      display: block;
    }

    .main-form {
      margin: 50px 0;

      p {
        color: #2d2d2d;
      }

      .question {
        background: white;
        border-radius: 0.25rem;
        padding: 25px 40px;
        margin-bottom: 20px;

        h5 {
          color: #2b2b2b;
          margin: 0;
        }

        .response-controls {
          display: flex;
          flex-direction: column;
          height: 110px;
          justify-content: space-between;
          width: 90%;
          margin: 1em auto;
        }
      }

      .radio-question {
        .response-controls {
          label {
            display: flex;
            align-items: center;
            color: #838383;
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

        &.slider-question {
          .slider {
            margin: 50px 30px;
          }
        }
      }
    }

    .footer {
      display: flex;
      justify-content: flex-end;

      button {
        font-size: 14px;
        height: auto;
        cursor: pointer;
        border-radius: 5px;
      }

      button:nth-of-type(1) {
        margin-right: 20px;
        background: white;
        color: #c30340;
        border: 1px solid #c30340;
        padding: 8px 20px;
      }

      button:nth-of-type(2) {
        background: #c30340;
        color: white;
        padding: 15px 40px;
      }
    }
  }

  .vue-slider-ltr .vue-slider-mark-label:first-child {
    margin-left: 60px !important;
  }

  h2,
  h5 {
    margin-bottom: 10px;
    font-weight: 600;
  }

  .vue-slider-ltr .vue-slider-mark-label,
  .vue-slider-rtl .vue-slider-mark-label {
    margin-top: 20px;
  }

  .vue-slider-dot-handle {
    background: #c30340;
  }

  .vue-slider-process {
    background-color: #808080;
  }
}
</style>
