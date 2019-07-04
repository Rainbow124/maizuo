import Vue from "vue";
import router from "./router";
import store from "./store";
import App from "./App";
import axios from "axios";
import { Tab, Tabs, Toast, List, Search } from "vant";
import "./assets/styles/base.less";

Vue.config.productionTip = false;

Vue.use(Tab)
  .use(Tabs)
  .use(Toast)
  .use(List)
  .use(Search);

new Vue({
  el: "#app",
  router,
  store,
  axios,

  render: h => h(App)
});
