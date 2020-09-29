import Vue from "vue";
import VueRouter from "vue-router";
//import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/",
    component: () => import("../layouts/Main.vue"),
    children: [
      { path: "/employee", component: () => import("../views/Employee.vue") },
      { path: "/employer", component: () => import("../views/Employer.vue") },
    ],
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
