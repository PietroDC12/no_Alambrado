<template>
  <div class="app-container">
    <Navbar />
    <main class="content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import { provide, ref } from "vue";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  setup() {
    const isAuthenticated = ref(!!localStorage.getItem("access_token"));

    const login = (token) => {
      localStorage.setItem("access_token", token);
      isAuthenticated.value = true;
    };

    const logout = () => {
      localStorage.removeItem("access_token");
      isAuthenticated.value = false;
    };

    const authState = { isAuthenticated, login, logout };
    provide("authState", authState);

    return { authState };
  },
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style>
/* Faz com que a página ocupe toda a altura disponível */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Garante altura mínima de 100% da tela */
  width: 100vw; /* Garante que a largura nunca ultrapasse */
  overflow-x: hidden; /* Impede que algo ultrapasse os limites */
  box-sizing: border-box;
}

/* O conteúdo principal cresce para empurrar o footer para baixo */
.content {
  flex: 1;
  padding: 80px 20px 20px; /* Aumentei o padding-top para empurrar o conteúdo */
}
</style>

