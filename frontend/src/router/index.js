import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Contact from "../views/Contact.vue"

const routes = [
  { path: "/", component: Home },
  { path: "/contato", component: Contact },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;