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
  { path: "/", component: Home, meta: { requiresAuth: false, title: 'Home' } },
  { path: "/contato", component: Contact, meta: { requiresAuth: false, title: 'Contato'  } },
  { path: "/sobre", component: Project, meta: { requiresAuth: false, title: 'Sobre o Projeto'  } },
  { path: "/noticias", component: News, meta: { requiresAuth: false, title: 'Notícias'  } },
  { path: "/noticia/:id", component: NewsDetails, meta: { requiresAuth: false, title: '...'  } },
  { path: "/noticias/:id/editar", component: NewsEdit, meta: { requiresAuth: true, title: 'Edição'  } },
  { path: "/login", component: Login, meta: { requiresAuth: false, title: 'Login'  } },
  { path: "/criar/noticia", component: CreateNews, meta: { requiresAuth: true, title: 'Nova notícia'  }, },
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