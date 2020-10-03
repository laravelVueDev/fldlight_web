<template>
  <transition name="fade">
    <div class="company-timeseries">
      <h2>{{ company.ticker }} Contribution Trends</h2>
      <p class="description">
        Political leanings may change over time. The charts below show
        {{ company.name }}'s and its subsidiaries' contributions on an annual
        basis since the 2008 election cycle.
      </p>
      <div class="charts-container row">
        <div class="col-lg-6 pie-container">
          <h3>Party alignment</h3>
          <canvas class="chart-time-pie"></canvas>
        </div>
        <div class="col-lg-6 line-container">
          <h3>Dollars contributed</h3>
          <canvas class="chart-time-line"></canvas>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Chart from "chart.js";
import format from "@/utils/number-format.js";

export default {
  name: "CompanyTimeseries",
  props: {
    company: Object,
    years: Array
  },
  data() {
    return {
      updating: true,
      lineChart: null,
      pieChart: null
    };
  },
  watch: {
    years: function() {
      this.makeLine();
      this.makePie();
    }
  },
  mounted() {
    this.makeLine();
    this.makePie();
  },
  methods: {
    makeLine() {
      const ctx = this.$root.$el
        .querySelector("canvas.chart-time-line")
        .getContext("2d");

      const labels = this.years.map(item => item.year);
      const demData = this.years.map(item => item.DEM.amount);
      const repData = this.years.map(item => item.REP.amount);
      const otherData = this.years.map(item => item.Other.amount);

      // Set up line chart data
      const lineData = [
        {
          label: "DEM",
          data: demData,
          borderColor: "#5E81AC"
        },
        {
          label: "Other",
          data: otherData,
          borderColor: "#D8DEE9"
        },
        {
          label: "REP",
          data: repData,
          borderColor: "#BF616A"
        }
      ];

      // Line Chart Options
      const options = {
        legend: {
          display: false
        },
        tooltips: {
          intersect: false,
          callbacks: {
            label: item => {
              const party = lineData[item.datasetIndex].label;

              return `${party} ${format(
                item.value,
                "currencyMax2",
                "short"
              )} ${format(this.years[item.index][party].percent, "percent")}`;
            },
            title: item => {
              return `${item[0].label} ${this.company.ticker} Contributions`;
            }
          }
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                drawBorder: false
              },
              ticks: {
                // callback: (value, index) => ((index + 1) % 2 === 0 ? value : "")
              }
            }
          ],
          yAxes: [
            {
              position: "right",
              gridLines: {
                display: false,
                drawBorder: false
              },
              ticks: {
                callback: (value, index) => {
                  if (index % 2 === 0) {
                    return format(value, "currencyMax2", "short");
                  }
                  return "";
                },
                minor: {
                  enabled: false
                }
              }
            }
          ]
        }
      };
      // End options

      if (this.lineChart) {
        this.lineChart.destroy();
      }

      // Draw Line Chart
      this.lineChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: lineData
        },
        options: options
      });
    },
    makePie() {
      const pieCtx = this.$root.$el
        .querySelector("canvas.chart-time-pie")
        .getContext("2d");
      const labels = ["DEM", "Other", "REP"];
      const pieData = this.years.map(item => {
        return {
          label: item.year,
          data: [item.DEM.percent, item.Other.percent, item.REP.percent],
          backgroundColor: ["#5E81AC", "#D8DEE9", "#BF616A"]
        };
      });

      const options = {
        legend: { display: false },
        cutoutPercentage: 20,
        animation: {
          animateScale: true
        },
        circumference: Math.PI,
        rotation: Math.PI,
        tooltips: {
          callbacks: {
            label: item => {
              const party = labels[item.index];
              const percent = pieData[item.datasetIndex].data[item.index];
              return `${party} ${format(percent, "percent")}`;
            },
            title: item => {
              const year = pieData[item[0].datasetIndex].label;
              return `${year} ${this.company.ticker} Contributions`;
            }
          }
        }
      };

      if (this.pieChart) {
        this.pieChart.destroy();
      }

      this.pieChart = new Chart(pieCtx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: pieData.reverse()
        },
        options: options
      });
    }
  }
};
</script>

<style scoped lang="scss">
.company-timeseries {
  width: 100%;
  margin: 5rem 0;
  @include breakpoint($mobile-down) {
    margin-bottom: 0;
  }
}

.description {
  max-width: 50rem;
}

.charts-container {
  display: flex;
  justify-content: space-between;
}

.charts-container h3 {
  border-bottom: 1px solid #eee;
  padding-bottom: 6px;
}

.chart-parties {
  width: 200px;
}

.pie-container {
  max-width: 420px;
}

.line-container {
  max-width: 480px;
}

.pie-container,
.line-container {
  @include breakpoint($tablet-down) {
    margin: 2rem auto;
  }
  @include breakpoint($mobile-down) {
    max-width: 100%;
  }
}
</style>
