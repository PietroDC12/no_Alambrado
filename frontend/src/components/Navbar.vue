<template>
  <nav class="navbar">
    <div class="nav-links">
      <router-link to="/">Início</router-link>
      <router-link to="/noticias">Notícias</router-link>
      <router-link to="/sobre">Sobre</router-link>
      <router-link to="/contato">Contato</router-link>
    </div>

    <div class="auth-links">
      <router-link v-if="!authState.isAuthenticated.value" to="/login">Login</router-link>
      <router-link v-if="authState.isAuthenticated.value" to="/criar/noticia">Criar Notícia</router-link>
      <button v-if="authState.isAuthenticated.value" @click="handleLogout">Sair</button>
    </div>
  </nav>
</template>

<script>
import axios from "axios";  // ✅ Corrigido: Importação do Axios
import { inject } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const authState = inject("authState");
    const router = useRouter();

    const handleLogout = async () => {
      try {
        await axios.post("https://no-alambrado.onrender.com/api/accounts/logout/", {}, { withCredentials: true });

        // Remover tokens do localStorage ou cookies, se necessário
        localStorage.removeItem("access_token");

        authState.isAuthenticated.value = false; // ✅ Atualiza o estado de autenticação

        router.push("/"); // ✅ Redireciona para a página inicial
      } catch (error) {
        console.error("Erro ao fazer logout", error);
      }
    };

    return { authState, handleLogout };
  },
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #1a764d;
  padding: 10px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  z-index: 1000;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.auth-links {
  display: flex;
  align-items: center;
  gap: 15px;
}

.navbar a,
.auth-links button {
  color: white;
  text-decoration: none;
  font-weight: bold;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.navbar a:hover,
.auth-links button:hover {
  text-decoration: underline;
}

/* Evita que o conteúdo fique escondido atrás da Navbar */
body {
  padding-top: 50px;
  margin: 0;
  width: 100vw;
  overflow-x: hidden;
}
</style>