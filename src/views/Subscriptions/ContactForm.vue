<template>
  <div class="contact-form">
    <form id="contact-form" v-show="displayContactForm">
      <div class="row">
        <div class="col-xs-12 text-center">
          <p>
            Thank you for your interest in Floodlight.<br />
            Please share your contact information and a member of the Floodlight
            team will contact you within 24 hours.
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <label for="name">Name</label>
          <input type="text" id="name" ref="name" v-model="name" />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <label for="name">Email</label>
          <input type="email" id="email" ref="email" v-model="email" />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 text-center">
          <button class="btn btn--primary" @click="onSubmit">Send</button>
        </div>
      </div>
    </form>
    <p v-show="displayContactThanks">
      Thanks for your interest. We will be in touch shortly.
    </p>
  </div>
</template>

<script lang="js">
export default {
  name: 'contact-form',
  data() {
    return {
      name: '',
      email: '',
      displayContactForm: true,
      displayContactThanks: false
    }
  },
  methods: {
    onSubmit: async function (event) {
      event.preventDefault();

      await this.$http.post('/subscriptions/contact', {
        name: this.name,
        email: this.email
      });

      this.displayContactForm = false;
      this.displayContactThanks = true;

      this.$emit('contact-form-submitted');
    },
  },
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/variables";

.contact-form {
  p {
    text-align: center;
  }
}
</style>
