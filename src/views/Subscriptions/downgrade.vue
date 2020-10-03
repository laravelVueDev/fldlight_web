<template lang="html">
  <section class="downgrade">
    <div class="container container-fluid">
      <h1 class="display2">
        Do you really want to step back<br />
        from holding the standard?
      </h1>
      <div class="row">
        <div class="col col-xs-12">
          <p>You are about to lose access to:</p>
          <ul>
            <li>Company level affiliation of political campaigns</li>
            <li>Individual level reporting of political contributions</li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col col-xs-12">
          <ul class="actions">
            <li>
              <input
                type="button"
                class="btn"
                value="You're right, forget about it"
                @click="forgoCancel"
              />
            </li>
            <li>
              <input
                type="button"
                class="btn"
                value="Yes, downgrade now"
                @click="confirm"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getInstance } from "@/auth/auth.js";
import { mapMutations } from "vuex";

export default {
  name: "downgrade",
  data() {
    return {
      newPlanId: undefined,
      customerId: undefined,
      subscriptionId: undefined
    };
  },
  created: async function() {
    this.authService = getInstance();
    this.newPlanId = this.$route.query.newPlanId;
    this.customerId = this.$route.query.customerId;
    this.subscriptionId = this.$route.params.subscriptionId;
  },
  computed: {
    fullName() {
      const userData = this.authService.getUserMetadata();
      return `${userData["first_name"]} ${userData["last_name"]}`;
    }
  },
  methods: {
    ...mapMutations(["setSubscription"]),
    forgoCancel() {
      this.$router.push({ path: "/home" }).catch(err => err);
    },
    async confirm() {
      const payload = {
        name: this.fullName,
        email: this.authService.user.email,
        customerId: this.customerId,
        newPlanId: this.newPlanId,
        existingSubscriptionId: this.subscriptionId
      };

      const subscriptionUpdate = await this.$http.put(
        "/subscriptions",
        payload
      );

      this.setSubscription(subscriptionUpdate.data.data);
      await this.authService.getTokenSilently();
      this.$router.push({ path: "/home" }).catch(err => err);
    }
  }
};
</script>

<style scoped lang="scss">
.downgrade {
  margin: 4rem 0 10rem;

  .display2 {
    text-align: center;
    margin-bottom: 3rem;
  }

  p,
  ul,
  li {
    text-align: center;
    line-height: 1.5em;
  }

  ul.actions li {
    display: inline;
    margin: 0 3em;
  }

  input[type="button"] {
    max-width: 260px;
    margin-top: 3em;
  }
}
</style>
