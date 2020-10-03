<template lang="html">
  <div class="subscription-change">
    <p class="text-center">
      Your billing period will change, billed at the new interval starting
      today.
    </p>
    <p class="text-center">
      <input
        class="btn btn-primary"
        value="Confirm"
        v-bind:disabled="changeSubmitted"
        v-bind:class="{ disabled: changeSubmitted }"
        @click="processChange"
      />
    </p>
  </div>
</template>
<script lang="js">
import { mapMutations } from "vuex";

export default {
  name: 'subscription-change',
  props: {
    existingSubscriptionId: String,
    newPlanId: String,
  },
  data() {
    return {
      changeSubmitted: false
    }
  },
  methods: {
    ...mapMutations(["setSelectedPlan", "setSubscription"]),

    async processChange(event) {
      event.preventDefault();
      this.changeSubmitted = true;

      const updateRequest = await this.updateSubscription();

      if (updateRequest.error) {
        console.error(updateRequest.error.message);

      } else {
        this.setSubscription(updateRequest.data.data);
        this.$emit('subscription-updated');
      }
    },

    updateSubscription(){
      const payload = {
        existingSubscriptionId: this.existingSubscriptionId,
        newPlanId: this.newPlanId
      };

      return this.$http.patch('/subscriptions', payload);
    },
  },
}
</script>

<style scoped lang="scss">
.subscription-change {
  @import "../../assets/styles/variables";

  margin-bottom: 2em;

  .btn {
    max-width: 200px;
  }
}
</style>
