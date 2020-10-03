import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/styles/main.sass";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi" // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
  theme: {
    themes: {
      light: {
        primary: "#B53647",
        secondary: "#3B3B3B",
        anchor: "#5E81AC"
      }
    }
  }
});
