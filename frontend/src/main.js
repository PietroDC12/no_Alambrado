import { createApp } from 'vue';
import axios from 'axios';
import './style.css';
import App from './App.vue';
import router from './router';
import { reactive } from "vue";

// Estado Global de Autenticação
export const authState = reactive({
  isAuthenticated: !!localStorage.getItem("access_token"),
  login(token) {
    console.log("Método login chamado com token:", token);
    localStorage.setItem("access_token", token);
    this.isAuthenticated = true;
    console.log("Estado após login: isAuthenticated =", this.isAuthenticated);
  },
  logout() {
    console.log("Método logout chamado.");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("csrf_token");
    this.isAuthenticated = false;
    console.log("Estado após logout: isAuthenticated =", this.isAuthenticated);
  },
});

// Configuração do Axios
axios.defaults.withCredentials = true; // Permite envio de cookies para autenticação
axios.defaults.baseURL = "https://no-alambrado.onrender.com/api/";

// Obter CSRF Token antes de qualquer requisição
axios.get('accounts/csrf/')
  .then(response => {
    console.log("CSRF Token obtido:", response.data.csrfToken);
    axios.defaults.headers.common['X-CSRFToken'] = response.data.csrfToken; // Define o CSRF token
  })
  .catch(error => {
    console.error("Erro ao obter CSRF Token:", error);
  });

// Criação da aplicação Vue
const app = createApp(App);
app.config.globalProperties.$authState = authState; // Registra o authState globalmente

// Validar e garantir registro global
if (!app.config.globalProperties.$authState) {
  console.error("Falha ao registrar o authState globalmente!");
} else {
  console.log("AuthState registrado globalmente:", app.config.globalProperties.$authState);
}

window.appInstance = app; // Torna a instância Vue acessível globalmente
app.use(router); // Configura o roteador
app.mount("#app"); // Monta o app na DOM