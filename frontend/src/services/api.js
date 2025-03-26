import axios from "axios";

//const API_URL = "http://127.0.0.1:8000";

const API_URL = "https://no-alambrado.onrender.com";

// Busca todas as notícias
export const getNoticias = async () => {
  try {
    const response = await axios.get(`${API_URL}/noticias/`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar notícias:", error);
    return [];
  }
};

// Busca uma única notícia pelo ID
export const getNoticiaById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/noticias/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar a notícia com ID ${id}:`, error);
    return {};
  }
};

// Cria uma nova notícia, adicionando no banco de dados
export const postNoticia = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/noticias/criar/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar notícia:", error);
    throw error;
  }
};

//Alterar notícia
export const updateNoticia = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/noticias/${id}/editar/`, data);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar notícia ${id}:`, error);
    throw error;
  }
};

// Deletar notícia 
export const deleteNoticia = async (id) => {
  try {
    await axios.delete(`${API_URL}/noticias/${id}/deletar/`);
  } catch (error) {
    console.error(`Erro ao deletar notícia ${id}:`, error);
    throw error;
  }
};

// Login do usuário
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/token/`, { email, password });
    const { access, refresh } = response.data;

    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);

    // Atualiza o estado global após login
    const appInstance = window.appInstance; // Acessa a instância do Vue registrada
    appInstance.$authState.login(access); 

    console.log("Login bem-sucedido!");
    return { access, refresh };
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
};

// Logout do usuário
export const logoutUser = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

// Verifica se o usuário está autenticado
export const isAuthenticated = () => {
  return !!localStorage.getItem("access_token");
};