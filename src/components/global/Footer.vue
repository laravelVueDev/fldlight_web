<template lang="html">
  <section class="footer">
    <div class="copyright">
      &copy; Floodlight, Inc. 2020
    </div>
    <div class="footer__links">
      <router-link class="footer__link" to="/about">
        About
      </router-link>
      <router-link class="footer__link" to="/terms-of-service">
        Terms of Service
      </router-link>
      <router-link class="footer__link" to="/privacy-policy">
        Privacy Policy
      </router-link>
    </div>
  </section>
</template>

<script lang="js">

  export default  {
    name: 'Footer',
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
.footer {
  border-top: 12px solid $gray8;
  color: $gray4;
  background-color: $gray0;
  padding: 8rem 2rem;
  display: flex;
  @include breakpoint($tablet-down) {
    flex-direction: column;
  }

  .copyright {
    margin-right: 5rem;
    @include breakpoint($tablet-down) {
      margin-bottom: 1rem;
    }
  }

  &__link {
    color: $gray4;
    cursor: pointer;
    padding-right: 2.5rem;
    margin: 1rem;
    @include breakpoint($mobile-down) {
      display: block;
    }

    &:hover {
      text-decoration: underline;
    }
    &:last-of-type {
      padding-right: 0;
    }
  }
}
</style>
