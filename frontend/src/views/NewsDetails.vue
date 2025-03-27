<template>
  <div v-if="noticia && noticia.id" class="container">
    <h1>{{ noticia.tittle_news }}</h1>
    <h3>{{ noticia.subtittle_news }}</h3>
    <p class="author">Por: {{ noticia.author }} | {{ formatDate(noticia.date_news) }}</p>

    <img v-if="noticia.image_url" :src="noticia.image_url.replace('http:', 'https:')" alt="Imagem da notícia" />

    <p v-html="formattedText"></p>

    <button @click="$router.push('/')">Voltar</button>

    <!-- Os botões só aparecem se `authState` existir e o usuário estiver autenticado -->
    <button v-if="authState?.isAuthenticated?.value" @click="excluirNoticia" class="btn btn-danger">Excluir</button>
    <button v-if="authState?.isAuthenticated?.value" class="btn btn-edit">
      <router-link :to="'/noticias/' + noticia.id + '/editar'">Editar</router-link>
    </button>
  </div>

  <div v-else>
    <p>Carregando notícia...</p>
  </div>
</template>

<script>
import { getNoticiaById, deleteNoticia } from '../services/api';
import { inject } from "vue"; // Importa `inject` para buscar o authState, se disponível

export default {
  data() {
    return {
      noticia: {},
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    this.noticia = await getNoticiaById(id);
  },
  computed: {
    formattedText() {
      return this.noticia?.text_news ? this.noticia.text_news.replace(/\n/g, "<br>") : "";
    },
  },
  setup() {
  const authState = inject("authState", null);
  console.log("authState:", authState); // Verifica se está sendo injetado corretamente
  console.log("authState.isAuthenticated:", authState?.isAuthenticated?.value); // Verifica o estado da autenticação
  return { authState };
},
  methods: {
    formatDate(dateString) {
      if (!dateString) return "Data não disponível";
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    },
    async excluirNoticia() {
      if (confirm("Tem certeza que deseja excluir esta notícia?")) {
        try {
          await deleteNoticia(this.noticia.id);
          alert("Notícia excluída com sucesso!");
          this.$router.push("/");
        } catch (error) {
          console.error("Erro ao excluir notícia:", error);
        }
      }
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 800px;
  margin: 1px auto;
  background: #fff;
}

h1 {
  text-align: center;
  font-size: 40px;
  margin: 1px;
}

h3 {
  text-align: center;
  color: #555;
}

img {
  max-width: 100%;
  max-height: 300px;
  width: auto;
  height: auto;
  display: block;
  margin: 20px auto;
  object-fit: contain;
  border-radius: 10px;
}

.author {
  font-size: 0.9em;
  color: gray;
  margin-top: 10px;
  text-align: center;
}

p {
  font-size: 16px;
  line-height: 1.6;
  text-align: justify;
  padding: 0 10px;
}

button {
  display: block;
  width: 150px;
  margin: 20px auto;
  background: rgb(24, 105, 13);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background: rgb(14, 70, 7);
}

.btn-danger {
  background: red;
  color: white;
}

.btn-edit {
  background: yellow;
  color: white;
}
</style>
