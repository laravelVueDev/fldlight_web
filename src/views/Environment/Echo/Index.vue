<template>
  <div class="echo">
    <div class="container container-fluid">
      <transition name="fade">
        <div v-show="!updating">
          <div class="content-header">
            <h1>
              ECHO Facility Resolver
            </h1>
            <p class="text-italic">
              Associate facilities that appear in the ECHO database with
              publicly traded companies.
            </p>
          </div>
          <div class="row">
            <div class="col-lg-4">
              <Companies v-on:selected="selectCompany" />
            </div>
            <div class="col-lg-4">
              <Subsidiaries v-bind:company="selectedCompany" />
            </div>
            <div class="col-lg-4">
              <Facilities v-bind:company="selectedCompany" />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Companies from "./Companies";
import Facilities from "./Facilities";
import Subsidiaries from "./Subsidiaries";
export default {
  name: "Echo",
  components: {
    Companies,
    Facilities,
    Subsidiaries
  },
  data() {
    return {
      updating: false,
      selectedCompany: undefined
    };
  },
  methods: {
    selectCompany(company) {
      this.selectedCompany = company;
    }
  }
};
</script>

<style scoped lang="scss">
.echo {
  padding-top: 4rem;
  min-height: 100vh;

  .content-header {
    h1 {
      margin: 0;
    }
  }

  div.col-lg-4 {
    border-right: 1px solid $gray8;

    &:last-child {
      padding-right: 0;
      border-right: none;
      margin-right: 0;
    }
  }
}
</style>
