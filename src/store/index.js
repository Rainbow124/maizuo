import Vue from "vue";
import Vuex from "vuex";
import film from "./modules/film";
import city from "./modules/city";
import user from "./modules/user";
import details from "./modules/details";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    film,
    city,
    user,
    details
  }
});
