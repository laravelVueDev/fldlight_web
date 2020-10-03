import Vue from "vue";
import HttpClient from "./utils/http-service";
import VueAnalytics from "vue-analytics";
import VueNumber from "vue-number-animation";
import { Auth0Plugin } from "@/auth/auth.js";

import { domain, clientId, audience } from "../auth_config";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/styles/index.scss";
import "./registerServiceWorker";

import * as Sentry from "@sentry/browser";
import * as Integrations from "@sentry/integrations";
import vuetify from "./plugins/vuetify";

if (location.hostname !== "localhost") {
  Sentry.init({
    dsn: "https://970b5c5d00c54d4288a5a1c10041f21e@sentry.io/5183992",
    integrations: [new Integrations.Vue({ Vue, attachProps: true })],
    environment: process.env.NODE_ENV
  });
}

// Default to test account
const googleAnalyticsID =
  process.env.VUE_APP_GOOGLE_ANALYTICS_ID || "UA-141028211-5";
Vue.config.productionTip = process.env.NODE_ENV === "production" ? true : false;

Vue.use(VueNumber);
Vue.config.productionTip = false;

// Authentication
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

Vue.prototype.$http = HttpClient();

// Analytics
Vue.use(VueAnalytics, {
  id: googleAnalyticsID,
  router
});

// Set up Vue Instance
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
