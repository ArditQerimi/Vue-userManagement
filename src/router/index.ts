import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/RegisterView/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/RegisterView/Register.vue"),
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/students",
      name: "students",
      component: () => import("../views/StudentsView/StudentsView.vue"),
    },
    {
      path: "/archives",
      name: "archives",
      component: () => import("../views/ArchiveView/ArchiveView.vue"),
    },
  ],
  linkActiveClass: "active-menu-item",
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem("accessToken");

  if (to.path === "/login" || to.path === "/register") {
    if (isLoggedIn) {
      next({ path: "/home" });
    } else {
      next();
    }
  } else {
    if (!isLoggedIn) {
      next({ path: "/login" });
    } else {
      next();
    }
  }
});

export default router;
