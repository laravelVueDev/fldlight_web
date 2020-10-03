<template>
  <div id="app">
    <Header />
    <Main>
      <v-app>
        <router-view />
      </v-app>
    </Main>
    <Footer />
  </div>
</template>

<script lang="js">
import {mapActions} from "vuex";

import Header from '@/components/global/Header'
import Main from '@/components/global/Main'
import Footer from '@/components/global/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Main,
    Footer
  },
  // data needed on boot
  mounted() {
    this.getCompanyOfTheDay();
  },
  methods: {
    ...mapActions(["getCompanyOfTheDay"])
  }
}
</script>

<style lang="scss">
#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.main {
  flex: 1;
  margin-top: $header-height;
}
</style>
