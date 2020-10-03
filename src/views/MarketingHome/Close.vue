<template lang="html">
  <section class="close">
    <div class="container container-fluid">
      <h2 class="display1">
        See the impact Floodlight can have with your clients
      </h2>
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
  padding-top: 379px;
  color: $white;
  text-align: center;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: $teal;
    margin-top: -379px;
  }

  @include breakpoint($desktop-down) {
    padding-top: 8rem;
    background-color: $teal;
  }
  .display1 {
    line-height: 1.5;
  }
}
</style>
