<template>
  <nav class="navbar">
    <div class="nav-links">
      <router-link to="/">Início</router-link>
      <router-link to="/noticias">Notícias</router-link>
      <router-link to="/sobre">Sobre</router-link>
      <router-link to="/contato">Contato</router-link>
    </div>

    <div class="auth-links">
      <router-link v-if="isAuthenticated" to="/criar/noticia">Criar Notícia</router-link>
      <button v-if="isAuthenticated" @click="handleLogout">Sair</button>
      <router-link v-else to="/login">Login</router-link>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";
import { computed, watchEffect } from "vue";
import { authState } from "../auth"; // Importa o estado global corretamente

export default {
  setup() {
    const router = useRouter();
    const isAuthenticated = computed(() => authState.isAuthenticated); // Computed para garantir reatividade

    const handleLogout = async () => {
      try {
        console.log("Logout iniciado...");
        await axios.post("https://no-alambrado.onrender.com/api/accounts/logout/", {}, { withCredentials: true });

        authState.logout(); // Chama logout corretamente
        console.log("Logout realizado com sucesso. Estado atualizado: isAuthenticated =", authState.isAuthenticated);

        router.push("/"); // Redireciona para a home
      } catch (error) {
        console.error("Erro ao realizar logout:", error);
      }
    };

    // Atualiza a navbar quando o authState mudar
    watchEffect(() => {
      console.log("Autenticação mudou:", authState.isAuthenticated);
    });

    return { handleLogout, isAuthenticated };
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
</style>
