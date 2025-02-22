import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue";
import Admin from "./pages/Admin.vue";

import { createRouter, createWebHistory } from "vue-router";
import Banner from "./pages/Dashboard/Banner.vue";
import Create from "./pages/Dashboard/Banner/Create.vue";
import Info from "./pages/Dashboard/Info.vue";
import Detail from "./pages/Dashboard/Banner/Detail.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/admin",
      meta: { requiresAuth: true },
      component: Admin,
    },
    {
      path: "/admin/banner",
      meta: { requiresAuth: true },
      component: Banner,
    },
    {
      path: "/admin/banner/create",
      meta: { requiresAuth: true },
      component: Create,
    },
    {
      path: "/admin/info",
      meta: { requiresAuth: true },
      component: Info,
    },
    {
      path: "/admin/banner/:id",
      meta: { requiresAuth: true },
      component: Detail,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated
  ) {
    if (to.path !== "/") {
      next("/"); 
    } else {
      next(); 
    }
  } else {
    next();
  }
});

const app = createApp(App);
app.use(router);
app.mount("#app");
