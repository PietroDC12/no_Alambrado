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
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import { authState } from "./main.js";
import { provide } from "vue";

export default {
  setup() {
    provide("authState", authState); // Agora authState será acessível nos componentes filhos
  },
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  box-sizing: border-box;
}

.content {
  flex: 1;
  padding: 80px 20px 20px;
}
</style>
