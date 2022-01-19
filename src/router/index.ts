import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Home from "@/views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/",
        name: "Login",
        component: () => import("@/components/Home/TheLogin.vue"),
      },
      {
        path: "/rooms/new",
        name: "NewRoom",
        component: () => import("@/components/Home/TheNewRoom.vue"),
      },
    ],
  },
  {
    path: "/rooms/:id",
    name: "Sala",
    component: () => import("@/views/Room.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
