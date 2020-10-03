<template>
  <section class="about">
    <div class="container container-fluid">
      <h1 class="display2">About</h1>
      <div class="row">
        <h2 class="mission-statement">
          Floodlight's mission is to provide truly unbiased information to the
          world. We empower investment professionals to evaluate financial
          strategies that align with their client’s values. By holding companies
          to their own standards, and enabling investors to choose accordingly,
          Floodlight reinvents the financial system.
        </h2>
      </div>
    </div>
    <Team />
    <div class="container container-fluid">
      <div class="row">
        <div class="stay-in-touch">
          <h1>Get in touch</h1>
          <form action="" v-show="displayContactForm">
            <div class="form-group">
              <input
                type="text"
                placeholder="email@example.com"
                v-model="email"
              />
              <button
                type="submit"
                class="btn btn--primary"
                @click="onSubmitContact"
              >
                Submit
              </button>
            </div>
            Drop us an email, and we'll keep you updated as Floodlight grows.
            We'll never distribute your email address, or use it for any other
            purpose.
          </form>
          <p v-show="displayContactThanks">
            Thanks for your interest. We will be in touch shortly.
          </p>
        </div>
      </div>
    </div>
    <div class="backing">
      <h1>Backed by</h1>
      <a href="https://www.villageglobal.vc/" target="_blank">
        <img
          class="village-global-image"
          src="@/assets/images/VillageGlobal.png"
          alt="Backed by Village Global"
        />
      </a>
    </div>
  </section>
</template>

<script>
import Team from "./Team";

export default {
  name: "About",
  components: {
    Team
  },
  data() {
    return {
      email: "",
      displayContactForm: true,
      displayContactThanks: false
    };
  },
  methods: {
    onSubmitContact: function(event) {
      event.preventDefault();

      this.$http.post("/contact", {
        email: this.email
      });

      this.displayContactForm = false;
      this.displayContactThanks = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.about {
  margin-top: 100px;
  @include breakpoint($mobile-down) {
    margin-top: 60px;
  }

  .display2 {
    text-align: center;
  }
}

.mission-statement {
  max-width: 75%;
  font-style: italic;
  margin: 2rem auto 100px;
  border-left: $decorative-line-size solid $decorative-line-color;
  padding-left: 2.5rem;
  @include breakpoint($mobile-down) {
    max-width: 100%;
    padding-left: 1rem;
    margin-left: 0;
    margin-right: 0;
  }
}

.stay-in-touch {
  max-width: 35rem;
  display: flex;
  flex-direction: column;
  margin: 70px auto 100px;
  border-left: $decorative-line-size solid $decorative-line-color;
  padding-left: 2.5rem;
  font-style: italic;
  @include breakpoint($mobile-down) {
    padding-left: 1rem;
  }

  h1 {
    margin-bottom: 1rem;
  }
  .form-group {
    display: flex;
    align-items: center;
    .btn {
      margin-left: 1rem;
      margin-bottom: 1.25rem;
    }
  }
}

.backing {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: $gray8;
  padding: 70px 0 100px;
}
.village-global-image {
  max-width: 300px;
}
</style>
