import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(require("vue-jalali-moment"));
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
      {
        path: "/employee",
        name: "employee",
        component: () => import("../views/Employee.vue"),
      },
      {
        path: "/employer",
        name: "employer",
        component: () => import("../views/Employer.vue"),
      },
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

router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && !localStorage.token) {
    next({ name: "Login" });
  }
  if (to.name !== "employee" && localStorage.role == "user") {
    next({ name: "employee" });
  }
  if (to.name !== "employer" && localStorage.role == "admin") {
    next({ name: "employer" });
  } else next();
});
export default router;
