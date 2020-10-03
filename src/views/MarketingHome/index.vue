<template>
  <div class="marketing-home-page">
    <Hero />
    <Stats />
    <CompanyOfTheDayTeaser />
    <Features />
    <Close />
  </div>
</template>

<script>
import Hero from "./Hero";
import Stats from "./Stats";
import Features from "./Features";
import CompanyOfTheDayTeaser from "./CompanyOfTheDayTeaser";
import Close from "./Close";

export default {
  name: "MarketingHome",
  components: {
    Hero,
    Stats,
    Features,
    CompanyOfTheDayTeaser,
    Close
  }
};
</script>

<style lang="scss">
.marketing-home-page section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 70px 0 100px 0;
}
</style>
