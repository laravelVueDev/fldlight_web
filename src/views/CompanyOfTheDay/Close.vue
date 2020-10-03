<template lang="html">
  <section class="close">
    <div class="container container-fluid">
      <h1>
        See the impact Floodlight can have with your clients
      </h1>
      <div class="products">
        <div class="product">
          <div class="product__title">Member</div>
          <div class="product__description">
            Limited access to floodlights features
          </div>
        </div>
        <div class="product">
          <div class="product__title">Subscriber</div>
          <div class="product__description">
            Unlimited access to all floodlights datasets. Plus first access to
            exclusive new content
          </div>
        </div>
        <div class="product">
          <div class="product__title">Enterprise</div>
          <div class="product__description">
            We will work directly with you to provide custom access solutions
            for your firm
          </div>
        </div>
      </div>
      <button class="btn btn--lg btn--primary" @click="login">
        Sign up
      </button>
    </div>
  </section>
</template>

<script lang="js">

  export default  {
    name: 'close',
    props: [],
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {
      // Log the user in. TODO: Move to vuex
      login() {
        this.$ga.event('login', 'login');
        this.$auth.loginWithRedirect();
        this.$router.push({path: 'home'});
      }
    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
.close {
  margin-top: 100px;
  padding: 70px 0 100px;
  background-color: $gray8;

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .products {
    display: flex;
    justify-content: space-between;
    margin: 4rem 0 6rem;
    @include breakpoint($mobile-down) {
      flex-direction: column;
      margin: 1rem 0 4rem;
    }
    .product {
      width: 25%;
      border-left: 3px solid $gray0;
      padding-left: 1.5rem;

      @include breakpoint($mobile-down) {
        width: 100%;
        margin: 1rem auto;
      }

      &__title {
        font-family: $secondary-font;
        font-style: italic;
        font-size: 1.75rem;
        margin-bottom: 0.75rem;
      }
    }
  }
}
</style>
