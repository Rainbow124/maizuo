import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      component: () => import("./views/home/index.vue"),
      children: [
        /*  {
          path: "films",
          component: () => import("./views/home/films/index.vue")
        },*/
        {
          path: "cinemas",
          component: () => import("./views/home/cinemas.vue")
        },
        {
          path: "films",
          component: () => import("./views/home/films/index.vue")
        },

        {
          path: "discount",
          component: () => import("./views/home/discount.vue")
        },
        {
          path: "center",
          component: () => import("./views/home/center.vue")
        },

        {
          path: "",
          redirect: "/films"
        }
      ]
    },
    {
      path: "/film/:filmId",
      name: "film",
      component: () => import("./views/film")
    },
    {
      path: "/city",
      component: () => import("./views/city")
    },
    {
      path: "/login",
      component: () => import("./views/login/index.vue")
    },
    {
      path: "*",
      redirect: "/films"
    }
  ]
});
