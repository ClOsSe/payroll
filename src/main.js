import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { axiosInstance } from "./plugins/axios";
import VueHtml2Canvas from "vue-html2canvas";

Vue.config.productionTip = false;
Vue.prototype.$axios = axiosInstance;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
Vue.use(VueHtml2Canvas);
