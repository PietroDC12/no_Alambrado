<template>
    <div class="container">
        <h1>Editar Matéria</h1>

        <form @submit.prevent="atualizarNoticia" class="form-container">
            <div class="form-group">
                <label for="title">Título</label>
                <input id="title" v-model="news.tittle_news" type="text" required />
            </div>

            <div class="form-group">
                <label for="subtitle">Subtítulo</label>
                <input id="subtitle" v-model="news.subtittle_news" type="text" required />
            </div>

            <div class="form-group">
                <label for="author">Autor</label>
                <input id="author" v-model="news.author" type="text" required />
            </div>

            <div class="form-group">
                <label for="content">Conteúdo</label>
                <textarea id="content" v-model="news.text_news" required></textarea>
            </div>

            <div class="form-group">
                <label for="image">Imagem</label>
                <input id="image" type="file" @change="handleImageUpload" accept="image/*" />
                <div v-if="news.image_news">
                    <p>Imagem atual:</p>
                    <img :src="getImageUrl(news.image_news)" alt="Imagem da notícia" class="preview-image" />
                </div>
            </div>

            <button type="submit" class="btn btn-success">Salvar Alterações</button>
        </form>
    </div>
</template>

<script>
import { getNoticiaById, updateNoticia } from "../services/api";

export default {
    data() {
        return {
            news: {
                tittle_news: "",
                subtittle_news: "",
                author: "",
                text_news: "",
                image_news: null,
                imageFile: null,
            },
        };
    },
    async created() {
        const id = this.$route.params.id;
        this.news = await getNoticiaById(id);
        
        // Ajustar a URL da imagem caso exista
        if (this.news.image_news) {
            this.news.image_news = this.getImageUrl(this.news.image_news);
        }
    },
    methods: {
        getImageUrl(imagePath) {
            if (!imagePath) return null;
            if (imagePath.startsWith('http')) return imagePath;
            return `http://127.0.0.1:8000${imagePath}`;
        },
        handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                this.news.imageFile = file;
                this.news.image_news = URL.createObjectURL(file);
            }
        },
        async atualizarNoticia() {
            const formData = new FormData();
            formData.append("tittle_news", this.news.tittle_news);
            formData.append("subtittle_news", this.news.subtittle_news);
            formData.append("author", this.news.author);
            formData.append("text_news", this.news.text_news);
            if (this.news.imageFile) {
                formData.append("image_news", this.news.imageFile);
            }

            try {
                await updateNoticia(this.news.id, formData);
                alert("Notícia atualizada com sucesso!");
                this.$router.push(`/noticias/${this.news.id}`);
            } catch (error) {
                console.error("Erro ao atualizar notícia:", error);
            }
        },
    },
};
</script>

<style scoped>
.container {
    max-width: 700px;
    margin: 50px auto;
    padding: 30px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-left: 6px solid #ffffff;
    border-right: 6px solid #ffffff;
}

h1 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 28px;
    color: #333;
}

form {
    display: flex;
    flex-direction: column;
}

label {
    font-weight: bold;
    margin-top: 12px;
    color: #333;
}

input,
textarea {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 16px;
    transition: all 0.2s ease-in-out;
    font-family: inherit;
}

input:focus,
textarea:focus {
    border-color: #ffffff;
    outline: none;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}

textarea {
    min-height: 250px;
    resize: vertical;
}

button {
    background: #1a764d;
    color: white;
    font-size: 18px;
    border: none;
    padding: 12px;
    cursor: pointer;
    margin-top: 20px;
    border-radius: 8px;
    transition: background 0.3s ease-in-out;
}

button:hover {
    background: #388E3C;
}

.preview-image {
    margin-top: 10px;
    max-width: 100%;
    border-radius: 5px;
}
</style>
