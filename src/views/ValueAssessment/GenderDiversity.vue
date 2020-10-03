<template lang="html">
  <div>
    <h2>Gender Diversity</h2>
    <p>
      Diversity Data Description: Floodlight provides data and insights on
      gender equality of US-based publicly traded companies and related
      entities based on 19 criteria, including the gender balance within the
      workforce, senior management and board of directors, as well as the gender
      pay gap, parental leave and sexual harassment.
    </p>

    <div class="main-form">
      <div class="question slider-question">
        <h5>
          I want to see investments with ________ gender diversity on the Board
          of directors.
        </h5>
        <div class="response-controls">
          <div class="slider">
            <vue-slider
              :data="labels.sliderRange"
              :marks="true"
              v-model="valueAssessment.form.gd_board_directors"
            ></vue-slider>
          </div>
        </div>
      </div>
      <div class="question slider-question">
        <h5>
          I want to see investments with ________ gender diversity at the
          Executive level.
        </h5>
        <div class="response-controls">
          <div class="slider">
            <vue-slider
              :data="labels.sliderRange"
              :marks="true"
              v-model="valueAssessment.form.gd_executive_level"
            ></vue-slider>
          </div>
        </div>
      </div>
      <div class="question slider-question">
        <h5>
          I want to see investments with ________ gender diversity at the Senior
          Managment level.
        </h5>
        <div class="response-controls">
          <div class="slider">
            <vue-slider
              :data="labels.sliderRange"
              :marks="true"
              v-model="valueAssessment.form.gd_senior_mgt_level"
            ></vue-slider>
          </div>
        </div>
      </div>
      <div class="question slider-question">
        <h5>
          I want to see investments with ________ gender diverse workforce.(**EA
          to add definitions).
        </h5>
        <div class="response-controls">
          <div class="slider">
            <vue-slider
              :data="labels.sliderRange"
              :marks="true"
              v-model="valueAssessment.form.gd_workforce"
            ></vue-slider>
          </div>
        </div>
      </div>
      <div class="question radio-question">
        <h5>
          I want to see investments with a commitment to ensure payment of a
          living wage to all employess.
        </h5>
        <div class="response-controls">
          <label
            ><input
              type="radio"
              value="Y"
              v-model="valueAssessment.form.gd_living_wage"
              class="radio"
            />
            yes, this is an investment priority to me</label
          >
          <label
            ><input
              type="radio"
              v-model="valueAssessment.form.gd_living_wage"
              class="radio"
              value="N"
            />
            no, this is not an investment priority to me</label
          >
        </div>
      </div>
      <!-- <div class="question radio-question">
        <h5>I want to see investments with a commitment to provide compareable wages for compareable work</h5>
        <div class="response-controls">
          <label
            ><input
              type="radio"
              value="Y"
              v-model="valueAssessment.form.tilt"
              class="radio"
            />
            yes, this is an investment priority to me</label
          >
          <label
            ><input
              type="radio"
              v-model="valueAssessment.form.tilt"
              class="radio"
            />
           no, this is not an investment priority to me</label
          >
        </div>
      </div> -->
      <div class="question radio-question">
        <h5>
          I want to see investments has published gender segrated pay
          information or on overall gender pay gap analysis in company reports
          or filings.
        </h5>
        <div class="response-controls">
          <label
            ><input
              type="radio"
              value="Y"
              v-model="valueAssessment.form.eq_pay_pub"
              class="radio"
            />
            yes, this is an investment priority to me</label
          >
          <label
            ><input
              type="radio"
              v-model="valueAssessment.form.eq_pay_pub"
              class="radio"
              value="N"
            />
            no, this is not an investment priority to me</label
          >
        </div>
      </div>
      <div class="question radio-question">
        <h5>
          I want to see investments has published gender segrated pay
          information for at least 3 job classifications.
        </h5>
        <div class="response-controls">
          <label
            ><input
              type="radio"
              value="Y"
              v-model="valueAssessment.form.eq_pay_pub_3"
              class="radio"
            />
            yes, this is an investment priority to me</label
          >
          <label
            ><input
              type="radio"
              v-model="valueAssessment.form.eq_pay_pub_3"
              class="radio"
              value="N"
            />
            no, this is not an investment priority to me</label
          >
        </div>
      </div>
      <div class="question radio-question">
        <h5>
          I want to see investments has a strategy with specific activites to
          close any gender pay gap.
        </h5>
        <div class="response-controls">
          <label
            ><input
              type="radio"
              value="Y"
              v-model="valueAssessment.form.eq_pay_strat"
              class="radio"
            />
            yes, this is an investment priority to me</label
          >
          <label
            ><input
              type="radio"
              v-model="valueAssessment.form.eq_pay_strat"
              class="radio"
              value="N"
            />
            no, this is not an investment priority to me</label
          >
        </div>
      </div>
      <div class="question radio-question">
        <h5>
          I want to see investments in companies with an overall gender pay gap
          of less than or equal to 3 percent.
        </h5>
        <div class="response-controls">
          <label
            ><input
              type="radio"
              value="Y"
              v-model="valueAssessment.form.eq_pay_gap"
              class="radio"
            />
            yes, this is an investment priority to me</label
          >
          <label
            ><input
              type="radio"
              v-model="valueAssessment.form.eq_pay_gap"
              class="radio"
              value="N"
            />
            no, this is not an investment priority to me</label
          >
        </div>
      </div>
      <!-- <div class="question radio-question">
        <h5>I want to see investments has published gender segrated pay information or on overall gender pay gap analysis in company reports or filings.</h5>
        <div class="response-controls">
          <label
            ><input
              type="radio"
              value="Y"
              v-model="valueAssessment.form.tilt"
              class="radio"
            />
            yes, this is an investment priority to me</label
          >
          <label
            ><input
              type="radio"
              v-model="valueAssessment.form.tilt"
              class="radio"
            />
            no, this is not an investment priority to me</label
          >
        </div>
      </div> -->
      <div class="question radio-question">
        <h5>
          I want to see investments in companies that provide equal pay for
          equal work in at least 3 job classifications.
        </h5>
        <div class="response-controls">
          <label
            ><input
              type="radio"
              value="Y"
              v-model="valueAssessment.form.eq_pay_gap3"
              class="radio"
            />
            yes, this is an investment priority to me</label
          >
          <label
            ><input
              type="radio"
              v-model="valueAssessment.form.eq_pay_gap3"
              class="radio"
              value="N"
            />
            no, this is not an investment priority to me</label
          >
        </div>
      </div>
      <!-- <div class="question radio-question">
        <h5>I want to see investments in companies that provide paid leave program for child care to primary and/or secondary care givers.</h5>
        <div class="response-controls-child-care">
          <label
            ><input
              type="radio"
              v-model="valueAssessment.form.tilt"
              class="radio"
            />
            offers both paid primary(14 weeks) and secondary care givers (2 weeks) leave
            </label
          >
          <label
            ><input
              type="radio"
              v-model="valueAssessment.form.tilt"
              class="radio"
            />
            offers a minimum of 14 weeks of paid primary care givers leave in the country of incorporation
            </label
          >
          <label
            ><input
              type="radio"
              v-model="valueAssessment.form.tilt"
              class="radio"
            />
            offers a minimum of 2 weeks of paid secondary care givers leave in the country of incorporation
            </label
          >
          <label
            ><input
              type="radio"
              v-model="valueAssessment.form.tilt"
              class="radio"
            />
            offers none of the above
            </label
          >
        </div>
      </div>  Database Columns are not cleared, once it has been cleared it will be implemented -->
    </div>
  </div>
</template>

<script lang="js">
  import VueSlider from 'vue-slider-component'
  import 'vue-slider-component/theme/default.css'
  import { mapMutations, mapGetters } from 'vuex'

  export default {
  name: "index",
  components: {VueSlider},
  data() {
    return {
      labels: {
        sliderRange: ['0-20%', '21-40%', '41-60%']
      },
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
          margin-top: 1em;
          height: 60px;
          justify-content: space-between;
        }
        .response-controls-child-care {
          display: flex;
          flex-direction: column;
          margin-top: 1em;
          height: 110px;
          justify-content: space-between;
        }
      }

      .radio-question {
        .response-controls,
        .response-controls-child-care {
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
