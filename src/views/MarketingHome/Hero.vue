<template lang="html">
  <section class="hero">
    <div class="container container-fluid">
      <h1 class="display1">
        Clients are demanding more transparency and accountability from their
        investments
      </h1>
      <h2 class="display4 font-primary">
        Floodlight helps you navigate values-based investing
      </h2>
      <button class="btn btn--lg btn--primary" @click="login">
        Sign up
      </button>
    </div>
  </section>
</template>

<script lang="js">

  export default  {
    name: 'Hero',
    methods: {
      // Log the user in. TODO: Move to vuex
      login() {
        this.$ga.event('login', 'login');
        this.$auth.loginWithRedirect();
        this.$router.push({path: 'home'});
      }
    }
}
</script>

<style scoped lang="scss">
.hero {
  padding-top: 100px;
  background: $nord4;
  background: linear-gradient(176deg, $gray8 0%, $gray4 97%);

  .container {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  h1,
  h2 {
    text-align: center;
    line-height: 1.4;
  }

  .btn {
    margin-top: 2rem;
  }
}
</style>
