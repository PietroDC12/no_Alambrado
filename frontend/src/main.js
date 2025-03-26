import { createApp } from 'vue';
import axios from 'axios';
import './style.css';
import App from './App.vue';
import router from './router';
import { reactive } from "vue";

// Estado Global de Autenticação
const authState = reactive({
  isAuthenticated: !!localStorage.getItem("access_token"), // Verifica se há um token ao carregar
  login(token) {
    console.log("Método login chamado com token:", token);
    localStorage.setItem("access_token", token); // Salva o token no localStorage
    this.isAuthenticated = true; // Atualiza o estado de autenticação
    console.log("Estado após login: isAuthenticated =", this.isAuthenticated);
  },
  logout() {
    console.log("Método logout chamado.");
    localStorage.removeItem("access_token"); // Remove o token do localStorage
    this.isAuthenticated = false; // Atualiza o estado de autenticação
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
console.log("AuthState registrado globalmente:", app.config.globalProperties.$authState);
window.appInstance = app; // Torna a instância acessível globalmente para outros usos
app.use(router); // Configura o roteador
app.mount("#app"); // Monta a aplicação na DOM
