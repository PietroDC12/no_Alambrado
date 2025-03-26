import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Contact from "../views/Contact.vue"
import News from "../views/News.vue"
import NewsDetails from "../views/NewsDetails.vue"
import Project from "../views/Project.vue"
import CreateNews from "../views/CreateNews.vue"
import NewsEdit from "../views/NewsEdit.vue";
import Login from "../views/Login.vue";

const routes = [
  { path: "/", component: Home, meta: { requiresAuth: false } },
  { path: "/contato", component: Contact, meta: { requiresAuth: false } },
  { path: "/sobre", component: Project, meta: { requiresAuth: false } },
  { path: "/noticias", component: News, meta: { requiresAuth: false } },
  { path: "/noticia/:id", component: NewsDetails, meta: { requiresAuth: false } },
  { path: "/noticias/:id/editar", component: NewsEdit, meta: { requiresAuth: true } },
  { path: "/login", component: Login, meta: { requiresAuth: false } },
  { path: "/criar/noticia", component: CreateNews, meta: { requiresAuth: true }, },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = window.appInstance?.config.globalProperties?.$authState?.isAuthenticated || false;

  console.log("Rota acessada:", to.path, "| Estado autenticado:", isAuthenticated);

  if (to.meta.requiresAuth && !isAuthenticated) {
    console.warn("Acesso negado à rota protegida:", to.path);
    next("/login");
  } else {
    console.log("Acesso permitido à rota:", to.path);
    next();
  }
});

export default router;