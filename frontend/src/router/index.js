import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Contact from "../views/Contact.vue"
import News from "../views/News.vue"
import NewsDetails from "../views/NewsDetails.vue"
import Project from "../views/Project.vue"
import CreateNews from "../views/CreateNews.vue"
import NewsEdit from "../views/NewsEdit.vue";
import Login from "../views/Login.vue";
import { authState } from "../auth"; 

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
  if (to.meta.requiresAuth && !authState.isAuthenticated) {
    alert("Você precisa estar logado para acessar esta página.");
    next("/login"); // Redireciona para login
  } else {
    next(); // Permite o acesso às páginas públicas
  }
});

export default router;