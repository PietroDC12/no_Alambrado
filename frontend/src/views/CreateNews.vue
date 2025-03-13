<template>
    <div class="container">
      <h1>Nova Matéria</h1>
      
      <form @submit.prevent="submitNews">
        <label for="title">Título</label>
        <input id="title" v-model="news.tittle_news" type="text" placeholder="Digite o título da notícia..." required />
  
        <label for="subtitle">Subtítulo</label>
        <input id="subtitle" v-model="news.subtittle_news" type="text" placeholder="Digite o subtítulo..." required />
  
        <label for="author">Autor</label>
        <input id="author" v-model="news.author" type="text" placeholder="Nome do autor..." required />
  
        <label for="content">Conteúdo</label>
        <textarea id="content" v-model.lazy="news.text_news" placeholder="Digite o conteúdo da notícia..." required></textarea>
  
        <label for="image">Imagem</label>
        <input id="image" type="file" @change="handleFileUpload" />
  
        <button type="submit"> Publicar Matéria</button>
      </form>
    </div>
  </template>
  
  <script>
  import { postNoticia } from "../services/api";
  
  export default {
    data() {
      return {
        news: {
          tittle_news: "",
          subtittle_news: "",
          author: "",
          text_news: "",
          image_news: null,
        },
      };
    },
    methods: {
      async submitNews() {
        const formData = new FormData();
        formData.append("tittle_news", this.news.tittle_news);
        formData.append("subtittle_news", this.news.subtittle_news);
        formData.append("author", this.news.author);
        formData.append("text_news", String(this.news.text_news));
        if (this.news.image_news) {
          formData.append("image_news", this.news.image_news);
        }
  
        try {
          await postNoticia(formData);
          alert("Notícia cadastrada com sucesso!");
          this.$router.push("/");
        } catch (error) {
          console.error("Erro ao enviar notícia:", error);
        }
      },
      handleFileUpload(event) {
        this.news.image_news = event.target.files[0];
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
  
  input, textarea {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 16px;
    transition: all 0.2s ease-in-out;
    font-family: inherit;
  }
  
  input:focus, textarea:focus {
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
  </style>
