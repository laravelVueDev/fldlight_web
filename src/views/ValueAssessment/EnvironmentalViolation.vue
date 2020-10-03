<template lang="html">
  <div>
    <h2>Enviromental Violation</h2>
    <p>
      Floodlight aggregates Environmental Protection Agency (EPA) violation
      records of US-based publicly traded companies and related entities.
      Violation data is classified into four primary violation categories:
      air, water, hazardous waste and drinking water. The aim is to allow
      better transparency into how investment dollars directly and
      indirectly contribute to environmental degradation.
    </p>

    <div class="main-form">
      <div class="question slider-question">
        <h5>I want to see investments with ________ EPA Air Violations</h5>
        <div class="response-controls">
          <div class="slider">
            <vue-slider
              :data="labels.sliderRange"
              :marks="true"
              v-model="valueAssessment.form.env_air"
            ></vue-slider>
          </div>
        </div>
      </div>
      <div class="question slider-question">
        <h5>
          I want to see investments with ________ EPA Water Violations
        </h5>
        <div class="response-controls">
          <div class="slider">
            <vue-slider
              :data="labels.sliderRange"
              :marks="true"
              v-model="valueAssessment.form.env_water"
            ></vue-slider>
          </div>
        </div>
      </div>
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
        sliderRange: ['few', 'moderate', 'any']
      },
      form: {
        env_air: 'any',
        env_water: 'any',
        env_hazmat: 'any',
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
          margin-top: 1em;
          height: 110px;
          justify-content: space-between;
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
