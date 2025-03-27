<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header corrigido (não fixo) -->
    <!--<header class="header">HEADER</header>-->

    <!-- Seção de 3 colunas -->
    <section class="columns">
      <div class="column">
        <h2>Últimas Notícias</h2>

        <div v-if="noticias.length">
          <div v-for="noticia in ultimasNoticias" :key="noticia.id" class="noticia-card">
            <img v-if="noticia.image_url" :src="noticia.image_url.replace('http:', 'https:')" alt="Imagem da notícia" />
            <h2>{{ noticia.tittle_news }}</h2>
            <!--<p>{{ noticia.subtittle_news }}</p>
            <p class="date">{{ formatarData(noticia.date_news) }}</p>-->
            <button class="btn btn-primary"><router-link :to="'/noticia/' + noticia.id"
                @click="registrarClique(noticia.id)">Ler mais</router-link></button>
            <br>
            <br>
          </div>
        </div>
        <p v-else>Carregando notícias...</p>
      </div>

      <div class="column">
        <h2 class="card-title"> Veja Também</h2>

        <div v-for="noticia in vejaNoticias" :key="noticia.id">
          <h2 class="text-home"><router-link :to="'/noticia/' + noticia.id" @click="registrarClique(noticia.id)">{{
            noticia.tittle_news }}</router-link></h2>
        </div>
      </div>

      <div class="column">
        <h2 class="card-title">Mais Clicadas</h2>
        <div v-for="(noticia, index) in noticiasMaisClicadas" :key="noticia.id">
          <h2 class="text-home"><router-link :to="'/noticia/' + noticia.id" @click="registrarClique(noticia.id)">{{
            index + 1 }}. {{ noticia.tittle_news }} <!--({{ noticia.click_count }} cliques)--></router-link></h2>
        </div>

      </div>
    </section>

    <!-- Conteúdo principal -->
    <main class="flex-1 bg-white p-4">

    </main>
  </div>
</template>

<script>
import axios from "axios";
import { getNoticias } from "../services/api";

export default {
  mounted() {
    document.title = 'Página Inicial'
  },
  data() {
    return {
      noticias: [],
      noticiasMaisClicadas: [],
    };
  },
  async created() {
    this.noticias = await getNoticias();

    const response = await axios.get("https://no-alambrado.onrender.com/noticias-mais-clicadas/");
    this.noticiasMaisClicadas = response.data;
  },

  computed: {
    ultimasNoticias() {
      return this.noticias.slice(0, 2); // Pegamos apenas as 2 mais recentes
    },
    vejaNoticias() {
      return this.noticias.slice(2, 7); // Pegamos entre 2 até 7
    },
  },
  methods: {
    formatarData(data) {
      const dataObj = new Date(data);
      return dataObj.toLocaleDateString("pt-BR");
    },
    getImageUrl(noticia) {
      console.log("Imagem recebida:", noticia.image_url); // Adiciona log para depuração

      if (!noticia.image_url) return "/placeholder.jpg"; // Se estiver vazio, mostra placeholder

      return noticia.image_url; // Retorna a URL da imagem
    },
    async registrarClique(noticiaId) {
      try {
        await axios.get(`https://no-alambrado.onrender.com/noticia/${noticiaId}/clique/`);
      } catch (error) {
        console.error("Erro ao registrar clique:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Header corrigido (agora ele fica no fluxo normal da página) */
.header {
  background-color: rgb(81, 22, 22);
  height: 84px;
  width: 100%;
  /* Agora ocupa toda a largura */
  margin: 0;
  /* Remove margens laterais */
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
  box-sizing: border-box;
  /* Evita que padding aumente o tamanho */
}

.columns {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  /* Espaço entre as colunas */
  padding: 20px;
  /* Reduzindo padding lateral */
  width: 100%;
  /* Ocupa toda a largura disponível */
  box-sizing: border-box;
}

/* Estilizando as colunas */
.column {
  flex: 1;
  /* Todas ocupam a mesma largura */
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
}

img {
  width: 100%;
  /* Ajusta ao tamanho do card */
  height: 140px;
  /* Define uma altura fixa */
  object-fit: cover;
  /* Mantém proporção e corta excesso */
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
}

/* Responsivo: no celular, colunas ficam empilhadas */
@media (max-width: 768px) {
  .columns {
    flex-direction: column;
    gap: 10px;
  }
}

.card-title {
  margin-top: 5px;
  font-size: 30px;
  color: #292929;
}

.card-image {
  width: 320px;
  /* Define um tamanho fixo para a largura */
  height: 240px;
  /* Define um tamanho fixo para a altura */
  object-fit: cover;
  /* Corta a imagem para preencher o espaço */
  border-radius: 8px;
}

.card-text {
  margin-top: 10px;
  font-size: 16px;
  color: #414141;
}

.text-home a {
  font-size: 26px;
  color: #1a764d;
  text-transform: uppercase;
  font-weight: bold;
}
</style>