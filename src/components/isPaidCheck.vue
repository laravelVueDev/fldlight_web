<template lang="html">
  <div class="is-paid-check">
    <!-- if paid account show content -->
    <div v-if="!isPaid">
      <div class="overlay"></div>
      <div class="content">
        <h1 class="title">
          This content is only available for paid subscribers
        </h1>
        <router-link
          class="upgrade btn btn--primary"
          :to="{
            name: 'subscriptions-edit',
            params: { subscriptionId: this.subscriptionID }
          }"
        >
          Upgrade Now
        </router-link>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="js">
  import selectn from "selectn";
  import {mapGetters} from "vuex";

  export default  {
    name: 'is-paid-check',
    props: [],
    computed: {
      ...mapGetters(["subscription"]),
      isPaid() {
        const paidPlanNames = ["monthly", "annual"];
        // auth0 access token can fall behind. Look first at local store for correct value
        const localStorePlan = selectn("plan.nickname", this.subscription);
        const sessionPlan = selectn("subscription.plan.nickname", this.$auth.getAppMetadata());

        const planNickname = localStorePlan || sessionPlan;

        if (!planNickname){
          return false;
        }

        return paidPlanNames.includes(planNickname.toLowerCase());
      },
      subscriptionID() {
        const metaData = this.$auth.getAppMetadata();
        return selectn('id', this.subscription) || selectn('subscription.id', metaData);
      }
    }
}
</script>

<style scoped lang="scss">
.is-paid-check {
  position: relative;
  margin: 3rem 0;
  .overlay {
    position: absolute;
    margin: -3rem;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: $gray0;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.7) 0%,
      rgba(200, 200, 200, 0.85) 60%,
      rgba(200, 200, 200, 1) 100%
    );
    z-index: 1;
  }
  .content {
    position: absolute;
    padding: 4rem;
    width: 50%;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    z-index: 2;
  }
}
</style>
