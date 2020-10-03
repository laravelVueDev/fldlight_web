<template lang="html">
  <section class="stats">
    <div class="container container-fluid">
      <a
        href="https://www.forbes.com/sites/markhall/2019/11/11/the-greatest-wealth-transfer-in-history-whats-happening-and-what-are-the-implications/#5a6fde614090"
        target="_blank"
      >
        <h2 class="display1">
          <strong>$30</strong> trillion is transferring to new decision makers
          <br />

          <span class="stat__attribution">Forbes</span>
        </h2>
      </a>
      <div class="row">
        <div class="col-lg-5">
          <a
            href="https://funds.eatonvance.com/includes/loadDocument.php?fn=21237.pdf&dt=fundPDFs"
            target="_blank"
          >
            <div class="stat">
              <div class="stat__body">
                73% of advisors have clients that have expressed interest in
                responsible investing

                <span class="stat__attribution">
                  Eaton Vance
                </span>
              </div>
            </div>
          </a>
        </div>
        <div class="col-lg-2"></div>
        <div class="col-lg-5">
          <a
            href="https://www2.deloitte.com/us/en/insights/industry/financial-services/esg-investing-performance.html"
            target="_blank"
          >
            <div class="stat">
              <div class="stat__body">
                Responsibly invested assets could account for 50% of all
                professionally managed assets &#40;>$34 trillion&#41; in the US
                by 2025

                <span class="stat__attribution">
                  USSIF/Deloitte
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="js">

  export default  {
    name: 'Stats',
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
.stats {
  background-color: $nord0;
  color: $gray8;
  position: relative;

  a {
    color: $gray8;
  }

  h2 {
    margin-bottom: 4rem;
    text-align: center;
    font-style: italic;
    line-height: 1.4;
    @include breakpoint($mobile-down) {
      margin-bottom: 1rem;
    }
  }

  .stat {
    text-align: center;
    font-family: $secondary-font;
    font-style: italic;
    line-height: 1.4;

    @include breakpoint($desktop-down) {
      margin-top: 3rem;
    }

    &__body {
      font-size: 2rem;
    }

    &__attribution {
      display: block;
      font-size: 1rem;
      color: $gray6;
      padding-top: 0.75rem;
      font-family: $primary-font;
      font-style: normal;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
