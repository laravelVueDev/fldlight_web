<template>
  <div class="overall">
    <div class="content-header">
      <h3>Top Holdings</h3>
    </div>
    <transition name="fade">
      <div v-show="!updating">
        <div class="overall-tables row">
          <div class="col-lg-6">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Weight</th>
                  <th>Contributions</th>
                </tr>
              </thead>
              <tbody>
                <ConstituentTableRow
                  v-for="constituent in holdings"
                  v-bind:constituent="constituent"
                  v-bind:key="constituent.ticker"
                ></ConstituentTableRow>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import ConstituentTableRow from "./ConstituentTableRow.vue";

export default {
  name: "TopHoldings",
  components: {
    ConstituentTableRow
  },
  data() {
    return {
      holdings: null,
      updating: true
    };
  },
  created: function() {
    this.getData();
  },
  watch: {
    $route() {
      this.getData();
    }
  },
  methods: {
    timeframe(item) {
      this.timeframeItem = item;
      this.$ga.event("fund", "top-holdings", item.label);
      this.getData();
    },
    async getData() {
      const detailsUrl = `/funds/${this.$route.params.ticker.toUpperCase()}/holdings`;
      this.updating = true;

      try {
        const response = await this.$http.get(detailsUrl);
        this.holdings = response.data.data;
        this.updating = false;
      } catch (e) {
        console.warn(e);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.overall {
  margin-top: 2rem;
  border-top: 1px solid $gray8;
  padding-top: 3rem;
}

.content-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    padding-bottom: 6px;
  }
}

.description {
  max-width: 50rem;
}

.overall-tables {
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  table {
    opacity: 1;
    transition: opacity 200ms ease-in;
    width: 100%;
  }

  th {
    text-align: left;
    font-weight: 500;
    border-bottom: 1px solid #ccc;
    padding: 6px 10px;
    vertical-align: top;
  }

  .number {
    text-align: right;
  }
}
</style>
