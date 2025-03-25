import { createApp } from 'vue';
import axios from 'axios';  // ✅ Importação do Axios
import './style.css';
import App from './App.vue';
import router from './router';

axios.defaults.withCredentials = true;  // ✅ Permitir envio de cookies nas requisições
axios.defaults.baseURL = "https://no-alambrado.onrender.com/api/";  // ✅ Definir a base da API

// Obtendo o CSRF Token antes de qualquer requisição
axios.get('accounts/csrf/')
  .then(response => {
    console.log("CSRF Token obtido:", response.data.csrfToken);
    axios.defaults.headers.common['X-CSRFToken'] = response.data.csrfToken;
  })
  .catch(error => {
    console.error("Erro ao obter CSRF Token:", error);
  });

const app = createApp(App);
app.use(router);
app.mount("#app");
