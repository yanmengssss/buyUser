import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      component: () => import("@/views/Login/LoginPage.vue"),
    },
    {
      path: "/register",
      component: () => import("@/views/Register/Register.vue"),
    },
    {
      path: "/findWord",
      component: () => import("@/views/findPassword/findPassword.vue"),
    },
    {
      path: "/home",
      component: () => import("@/views/Home/index.vue"),
    },
    {
      path: "/scanPage",
      component: () => import("@/views/scanPage.vue"),
    },
    {
      path: "/history",
      component: () => import("@/views/History/history.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  // 如果路径是根路径，重定向到 /login
  if (to.path === "/") {
    next("/login");
  } else {
    // 否则正常放行
    next();
  }
});

export default router;
