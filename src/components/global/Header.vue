<template lang="html">
  <!-- consider refactoring this to a parent component that toggles between desktop/mobile and logged in / logged out navigations -->
  <section class="header" :class="{ 'header--hidden': !showNavbar }">
    <div class="header-content">
      <div class="left">
        <!-- Logged Out -->
        <div v-if="!$auth.isAuthenticated" class="nav">
          <router-link to="/">
            <img class="logo" src="@/assets/logos/floodlight-white.png" />
          </router-link>
          <div class="desktop">
            <router-link class="nav__item" to="/company-of-the-day"
              >Company of the Day</router-link
            >
            <router-link class="nav__item" to="/about">About</router-link>
          </div>
        </div>

        <!-- Logged In -->
        <div v-if="$auth.isAuthenticated" class="nav">
          <router-link to="/home">
            <div class="beta">
              <img class="logo" src="@/assets/logos/floodlight-white.png" />
            </div>
          </router-link>
          <div class="desktop nav">
            <router-link
              v-if="$auth.isAuthenticated"
              class="nav__item"
              to="/value-assessment"
              >Value-assessment</router-link
            >
            <router-link class="nav__item" to="/about">About</router-link>
            <QuickSearch />
          </div>
        </div>
      </div>

      <div class="right">
        <div class="desktop">
          <!-- Logged Out -->
          <div v-if="!$auth.isAuthenticated">
            <a class="nav__item" v-if="!$auth.isAuthenticated" @click="login">
              Log in
            </a>
            <button
              class="btn btn--white"
              v-if="!$auth.isAuthenticated"
              @click="login"
            >
              Sign up
            </button>
          </div>

          <!-- Logged In -->
          <div v-if="$auth.isAuthenticated">
            <router-link
              v-if="!isPaid"
              class="nav__item"
              :to="{
                name: 'subscriptions-edit',
                params: { subscriptionId: this.subscriptionID() }
              }"
            >
              Upgrade Now
            </router-link>
            <router-link class="nav__item" to="/account-settings"
              >Settings
            </router-link>
            <button
              class="btn btn--white"
              v-if="$auth.isAuthenticated"
              @click="logout"
            >
              Log out
            </button>
          </div>
        </div>
        <div class="mobile">
          <button
            class="hamburger hamburger--squeeze"
            :class="{ 'is-active': mobileNavOpen }"
            type="button"
            @click="toggleMobileNav"
          >
            <span class="hamburger-box">
              <span class="hamburger-inner"></span>
            </span>
          </button>
          <transition name="slide">
            <div v-if="mobileNavOpen" class="mobile-nav">
              <!-- Logged Out -->
              <div v-if="!$auth.isAuthenticated">
                <router-link class="mobile-nav__item" to="/about"
                  >About
                </router-link>
                <router-link class="mobile-nav__item" to="/company-of-the-day"
                  >Company of the Day
                </router-link>
                <router-link class="mobile-nav__item" to="/value-assessment"
                  >Value-assessment
                </router-link>
                <a
                  class="mobile-nav__item"
                  v-if="!$auth.isAuthenticated"
                  @click="login"
                >
                  Log in / Sign Up
                </a>
              </div>

              <!-- Logged In -->
              <div v-if="$auth.isAuthenticated">
                <QuickSearch />
                <router-link class="mobile-nav__item" to="/about"
                  >About
                </router-link>
                <router-link
                  v-if="!isPaid"
                  class="mobile-nav__item"
                  :to="{
                    name: 'subscriptions-edit',
                    params: { subscriptionId: this.subscriptionID() }
                  }"
                >
                  Upgrade Now
                </router-link>
                <router-link class="mobile-nav__item" to="/account-settings"
                  >Settings
                </router-link>
                <a
                  class="mobile-nav__item"
                  v-if="$auth.isAuthenticated"
                  @click="logout"
                >
                  Log out
                </a>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="js">

import QuickSearch from "@/components/QuickSearch";
import selectn from "selectn";
import {mapGetters} from "vuex";
import {getInstance} from "@/auth/auth.js";

export default {
  name: 'Header',
  components: {
    QuickSearch
  },
  props: [],
  data() {
    return {
      authService: undefined,
      mobileNavOpen: false,
      showNavbar: true,
      lastScrollPosition: 0
    }
  },
  watch: {
    '$route'() {
      this.mobileNavOpen = false;
    }
  },
  mounted() {
    this.authService = getInstance();
    window.addEventListener('scroll', this.onScroll);
  },
  methods: {
    // Log the user in. TODO: Move to vuex
    login() {
      this.$ga.event('login', 'login');
      this.authService.loginWithRedirect();
      this.$router.push({path: 'home'});
    },
    // Log the user out
    logout() {
      this.$ga.event('login', 'logout');
      this.authService.logout({
        returnTo: window.location.origin
      });
    },
    subscriptionID() {
      const metaData = this.authService.getAppMetadata();
      return selectn('id', this.subscription) || selectn('subscription.id', metaData);
    },
    toggleMobileNav() {
      this.mobileNavOpen = !this.mobileNavOpen
    },
    onScroll() {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
      if (currentScrollPosition < 0) {
        return
      }
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 102) {
        return
      }
      this.showNavbar = currentScrollPosition < this.lastScrollPosition
      this.lastScrollPosition = currentScrollPosition
      this.mobileNavOpen = false;
    }
  },
  computed: {
    ...mapGetters(["subscription"]),
    isPaid() {
      const paidPlanNames = ["monthly", "annual"];
      // auth0 access token can fall behind. Look first at local store for correct value
      const localStorePlan = selectn("plan.nickname", this.subscription);
      const sessionPlan = selectn("subscription.plan.nickname", this.authService.getAppMetadata());

      const planNickname = localStorePlan || sessionPlan;

      if (!planNickname) {
        return false;
      }

      return paidPlanNames.includes(planNickname.toLowerCase());
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  }
}
</script>

<style scoped lang="scss">
.beta {
  position: relative;

  &:after {
    content: "beta";
    position: absolute;
    bottom: 0.25rem;
    left: 3.95rem;
    font-size: 11px;
    color: $white;
  }
}

.header {
  position: fixed;
  width: 100vw;
  z-index: 5;
  transform: translate3d(0, 0, 0);
  transition: 0.1s all ease-out;

  &.header--hidden {
    box-shadow: none;
    transform: translate3d(0, -100%, 0);
  }
}

.header-content {
  background-color: $primary;
  padding: 1rem 2rem;
  border-bottom: 12px solid $nord6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left {
  flex: 1;
}

.nav {
  display: flex;
  flex: 1;
  align-items: center;

  .logo {
    max-height: 55px;
    width: auto;
    display: inline-block;
    margin-right: 5rem;
    @include breakpoint($desktop-down) {
      margin-right: 1rem;
    }
  }

  &__item {
    font-weight: bold;
    color: $white;
    margin-right: 2rem;
    cursor: pointer;
    padding-bottom: 0.25rem;
    border-bottom: 2px solid transparent;

    &.router-link-exact-active {
      border-bottom-color: $white;
    }
  }
}

.mobile-nav {
  position: fixed;
  left: 0;
  top: $header-height;
  width: 100%;
  background-color: $gray8;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0px 5px 7px -1px $gray3;

  .mobile-nav__item {
    display: block;
    padding: 1rem;
    font-size: 1.2rem;
    color: $gray0;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }

    &:first-of-type {
      padding-top: 1rem;
    }

    &:last-of-type {
      padding-bottom: 3rem;
    }
  }
}

.desktop {
  @include breakpoint($desktop-down) {
    display: none;
  }
}

.mobile {
  @include breakpoint($desktop-up) {
    display: none;
  }
}
</style>
