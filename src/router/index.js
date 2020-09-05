import Vue from "vue";
import VueRouter from "vue-router";
//import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../layouts/Main.vue"),
    children: [
      { path: "/", component: () => import("../views/Login.vue") },
      { path: "/employee", component: () => import("../views/Employee.vue") },
      { path: "/employer", component: () => import("../views/Employer.vue") },
    ],
  },
  {
    path: "/Login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "*",
    component: () => import("../layouts/Error.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
