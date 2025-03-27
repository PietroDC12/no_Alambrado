<template>
    <div class="container">
        <h1>Últimas Notícias</h1>
        <div class="grid">
            <div v-for="noticia in noticias" :key="noticia.id" class="card">
                <img v-if="noticia.image_news" :src="getImageUrl(noticia.image_news)" alt="Imagem da notícia" />
                <div class="content">
                    <h3>{{ noticia.tittle_news }}</h3>
                    <!--<p>{{ noticia.text_news.slice(0, 100) }}...</p>-->
                    <button @click="verDetalhes(noticia.id), registrarClique(noticia.id)">Ver mais</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { getNoticias } from "../services/api";

export default {
    mounted() {
    document.title = 'Notícias'
  },
    data() {
        return {
            noticias: [],
        };
    },
    async mounted() {
        this.noticias = await getNoticias();
    },
    methods: {
        verDetalhes(id) {
            this.$router.push(`/noticia/${id}`);
        },
        getImageUrl(imagePath) {
            if (!imagePath) return "/placeholder.jpg"; // Caso não tenha imagem, usa um placeholder

            // Corrige URLs relativas, garantindo o domínio correto
            if (!imagePath.startsWith("http")) {
                return `https://no-alambrado.onrender.com${imagePath}`;
            }

            return imagePath;
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
.container {
    padding: 20px;
}

h1 {
    text-align: center;
    font-size: 40px;
}

.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* Sempre 3 colunas */
    gap: 60px;
    margin-left: 50px;
    margin-right: 50px;
}

/* No celular (largura menor que 768px), fica 1 card por linha */
@media (max-width: 768px) {
    .grid {
        grid-template-columns: 1fr;
        /* Apenas 1 coluna */
    }
}

/* Ajuste para a imagem não ficar gigante */
img {
    width: 100%;
    /* Ajusta ao tamanho do card */
    height: 220px !important;
    /* Define uma altura fixa */
    object-fit: cover;
    /* Mantém proporção e corta excesso */
    border-radius: 5px;
    border-style: solid;
    border-width: 1px;
}

.card {
    background: #f5f5f5;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
}

img {
    width: 100%;
    height: auto;
    border-radius: 5px;
}

.content {
    padding: 10px;
}

.author {
    font-size: 0.9em;
    color: gray;
}

button {
    background: rgb(24, 105, 13);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    margin-top: 10px;
}

button:hover {
    background: rgb(14, 70, 7);
}
</style>