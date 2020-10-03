import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/MarketingHome/index.vue";

import authGuard from "@/auth/authGuard.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "marketinghome",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/About/index.vue")
  },
  {
    path: "/company-of-the-day",
    name: "company-of-the-day",
    component: () =>
      import(
        /* webpackChunkName: "companyoftheday" */ "@/views/CompanyOfTheDay/index.vue"
      )
  },
  {
    path: "/privacy-policy",
    name: "privacy-policy",
    component: () =>
      import(
        /* webpackChunkName: "privacypolicy" */ "@/views/PrivacyPolicy.vue"
      )
  },
  {
    path: "/terms-of-service",
    name: "terms-of-service",
    component: () =>
      import(
        /* webpackChunkName: "termsofservice" */ "@/views/TermsOfService.vue"
      )
  },
  {
    path: "/value-assessment",
    name: "value-assessment",
    component: () =>
      import(
        /* webpackChunkName: "ValueAssessment" */ "@/views/ValueAssessment/index.vue"
      ),
    children: [
      {
        path: "",
        redirect: "politics"
      },
      {
        path: "politics",
        component: () => import("@/views/ValueAssessment/PoliticalAffiliation")
      },
      {
        path: "environment",
        component: () =>
          import("@/views/ValueAssessment/EnvironmentalViolation")
      }
      // {
      //   path: "diversity",
      //   component: () => import("@/views/ValueAssessment/GenderDiversity")
      // }
    ]
  },
  {
    path: "/value-assessment/result",
    name: "value-assessment-result",
    component: () =>
      import(
        /* webpackChunkName: "ValueAssessment" */ "@/views/ValueAssessment/Result.vue"
      )
  },
  {
    path: "/value-assessment/comparison",
    name: "value-assessment-comparison",
    component: () =>
      import(
        /* webpackChunkName: "ValueAssessment" */ "@/views/ValueAssessment/Comparison.vue"
      )
  },
  {
    path: "/home",
    name: "applicationhome",
    component: () =>
      import(
        /* webpackChunkName: "apphome" */ "@/views/ApplicationHome/index.vue"
      ),
    beforeEnter: authGuard
  },
  {
    path: "/account-settings",
    name: "account-settings",
    component: () =>
      import(
        /* webpackChunkName: "account-settings" */ "@/views/AccountSettings.vue"
      ),
    beforeEnter: authGuard
  },
  {
    path: "/funds/:ticker",
    name: "fund",
    component: () =>
      import(/* webpackChunkName: "companies" */ "@/views/Funds/Fund.vue")
    // beforeEnter: authGuard
  },
  {
    // company detail
    path: "/companies/:ticker",
    name: "company",
    component: () =>
      import(
        /* webpackChunkName: "companies" */ "@/views/CompanyDetail/Company.vue"
      ),
    beforeEnter: authGuard
  },
  {
    path: "/committee/:committee_id/:name",
    name: "committee",
    // route level code-splitting
    // this generates a separate chunk (companies.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "committee" */ "@/views/Committee/Committee.vue"
      ),
    props: true,
    beforeEnter: authGuard
  },
  {
    path: "/pricing",
    name: "pricing",
    component: () =>
      import(/* webpackChunkName: "pricing" */ "../views/Pricing.vue")
  },
  {
    path: "/subscriptions/:subscriptionId/edit",
    name: "subscriptions-edit",
    component: () =>
      import(
        /* webpackChunkName: "subscriptions" */ "../views/Subscriptions/edit.vue"
      ),
    beforeEnter: authGuard
  },
  {
    path: "/subscriptions/:subscriptionId/downgrade",
    name: "subscriptions-downgrade",
    component: () =>
      import(
        /* webpackChunkName: "subscriptions" */ "../views/Subscriptions/downgrade.vue"
      ),
    beforeEnter: authGuard
  },
  {
    // EPA ECHO admin UI
    path: "/environment/echo",
    name: "env-echo",
    component: () =>
      import(
        /* webpackChunkName: "environment" */ "@/views/Environment/Echo/Index.vue"
      ),
    beforeEnter: authGuard
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

export default router;
