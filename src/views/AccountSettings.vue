<template lang="html">
  <section class="account-settings">
    <div class="container container-fluid">
      <h1 class="display2">Account Settings</h1>
      <div class="account">
        <div class="user">
          <div class="user__info">
            <h2>{{ fullName }}</h2>
            <div>
              {{ $auth.user.email }}
              <br />
              {{ company }}
            </div>
          </div>
        </div>
        <div class="plan">
          <strong>Current Plan:</strong>
          {{ planName }}
        </div>
      </div>
      <button class="btn btn--primary" @click.prevent="submitChangePlan">
        Change Plan
      </button>
    </div>
  </section>
</template>
<script lang="js">
import { mapGetters } from 'vuex'
import selectn from 'selectn';

export default {
  name: 'AccountSettings',
  computed: {
    ...mapGetters(["company", "subscription"]),
    fullName(){
      const userData = this.$auth.getUserMetadata();
      return `${userData['first_name']} ${userData['last_name']}`
    },

    planName(){
      const metaData = this.$auth.getAppMetadata();
      const nickname = selectn('plan.nickname', this.subscription) || selectn('subscription.plan.nickname', metaData);
      return nickname ? `${nickname} plan subscriber` : '';
    },

    subscriptionId(){
      return this.subscription.id || this.$auth.getAppMetadata().subscription.id;
    }
  },
  methods: {
    submitChangePlan() {
      this.$router.push({path: `subscriptions/${this.subscriptionId}/edit`});
    }
  }
}
</script>
<style scoped lang="scss">
.account-settings {
  margin: 3rem 0 4rem;

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .account {
    border: 1px solid $gray7;
    padding: 2rem;
  }

  .user {
    display: flex;
    align-items: center;
    border-radius: 6px;
    text-align: center;
  }

  .plan {
    margin-top: 2rem;
    border-top: 1px solid $gray7;
    padding-top: 2rem;
    text-align: center;
  }

  button {
    margin-top: 2rem;
  }
}
</style>
