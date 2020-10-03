<template lang="html">
  <section class="features">
    <div class="container container-fluid">
      <h1 class="display2">Floodlight's Key Advantages</h1>
      <div class="line line-1"></div>
      <div class="row">
        <div class="col-lg-6">
          <h5>
            Floodlight is a holistic, data-driven platform for values-aligned
            investing
          </h5>
          <div class="line line-2"></div>
          <h5>
            Information provided on the dashboard helps you answer your client’s
            questions
          </h5>
        </div>
        <div class="col-lg-6 app-image-container">
          <!-- <div class="app-image"></div> -->
          <img
            src="@/assets/images/floodlight-screenshot.png"
            alt=""
            class="app-image"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="js">

  export default  {
    name: 'Features',
    props: [],
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
.features {
  background-color: $gray8;

  h5 {
    font-family: $primary-font;
  }

  .line {
    height: $decorative-line-size;
    background-color: $gray0;
  }

  .line-1 {
    width: 80%;
    margin-left: 20%;
    margin-bottom: 3rem;
  }

  .line-2 {
    width: 200%;
    margin: 2rem;
    margin-left: -100%;
  }

  .app-image-container {
    position: relative;
  }

  .app-image {
    max-width: 40rem;
    height: auto;
    position: absolute;
    top: 0.5rem;
    left: 2rem;
    z-index: 1;
    box-shadow: 0px 5px 7px -1px $gray3;

    @include breakpoint($desktop-down) {
      position: relative;
      max-width: calc(100vw - 3rem);
      height: auto;
      left: 0;
    }
  }
}
</style>
