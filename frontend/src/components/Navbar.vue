<template>
  <nav class="navbar">
    <router-link to="/">Início</router-link>
    <router-link to="/noticias">Notícias</router-link>
    <router-link to="/sobre">Sobre</router-link>
    <router-link to="/contato">Contato</router-link>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%; /* Garante que respeite a largura da tela sem cobrir a barra de rolagem */
  background: #1a764d;
  padding: 10px 40px;
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  box-sizing: border-box;
  z-index: 1000;
}

.navbar a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.navbar a:hover {
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