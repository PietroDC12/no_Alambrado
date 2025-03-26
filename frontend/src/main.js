import { createApp } from 'vue';
import axios from 'axios';
import './style.css';
import App from './App.vue';
import router from './router';

// Estado Global de Autenticação
import { reactive } from "vue";

const authState = reactive({
  isAuthenticated: !!localStorage.getItem("access_token"),
  login(token) {
    console.log("Método login chamado com token:", token);
    localStorage.setItem("access_token", token);
    this.isAuthenticated = true;
    console.log("Estado após login: Autenticado =", this.isAuthenticated);
  },
  logout() {
    console.log("Método logout chamado.");
    localStorage.removeItem("access_token");
    this.isAuthenticated = false;
    console.log("Estado após logout: Autenticado =", this.isAuthenticated);
  },
});

axios.defaults.withCredentials = true; 
axios.defaults.baseURL = "https://no-alambrado.onrender.com/api/";

axios.get('accounts/csrf/')
  .then(response => {
    console.log("CSRF Token obtido:", response.data.csrfToken);
    axios.defaults.headers.common['X-CSRFToken'] = response.data.csrfToken;
  })
  .catch(error => {
    console.error("Erro ao obter CSRF Token:", error);
  });

const app = createApp(App);
app.config.globalProperties.$authState = authState; // Registrar o estado global
console.log("AuthState registrado globalmente:", app.config.globalProperties.$authState);
window.appInstance = app; // Torna a instância acessível globalmente
app.use(router);
app.mount("#app");
