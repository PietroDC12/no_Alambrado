<template>
  <nav class="navbar">
    <div class="nav-links">
      <router-link to="/">Início</router-link>
      <router-link to="/noticias">Notícias</router-link>
      <router-link to="/sobre">Sobre</router-link>
      <router-link to="/contato">Contato</router-link>
    </div>

    <div class="auth-links">
      <router-link v-if="!$authState.isAuthenticated" to="/login">Login</router-link>
      <router-link v-if="$authState.isAuthenticated" to="/criar/noticia">Criar Notícia</router-link>
      <button v-if="$authState.isAuthenticated" @click="handleLogout">Sair</button>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const handleLogout = async () => {
      try {
        await axios.post("https://no-alambrado.onrender.com/api/accounts/logout/", {}, { withCredentials: true });

        // Atualiza o estado global após logout
        this.$authState.logout(); 
        router.push("/"); // Redireciona para a página inicial
      } catch (error) {
        console.error("Erro ao fazer logout:", error);
      }
    };

    return { handleLogout };
  },
};

console.log("Estado Atual de Autenticação:", this.$authState.isAuthenticated);

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
