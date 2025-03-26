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
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.error("Nenhum token encontrado! Usuário não autenticado.");
      throw new Error("Usuário não autenticado.");
    }

    const response = await axios.post(`${API_URL}/noticias/criar/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
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
    console.log("Iniciando login com:", email, password);

    const response = await axios.post(`${API_URL}/api/token/`, { email, password });
    console.log("Resposta do backend:", response.data);

    const { access, refresh } = response.data;

    // Salvar os tokens no localStorage
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    console.log("Tokens salvos:", { access, refresh });

    // Atualizar o estado global de autenticação
    const appInstance = window.appInstance; // Certifique-se de que a instância Vue está acessível globalmente
    if (appInstance && appInstance.$authState) {
      appInstance.$authState.login(access);
      console.log("Estado atualizado após login: Autenticado!", appInstance.$authState.isAuthenticated);
    } else {
      console.error("Instância do Vue ou authState não disponível!");
    }

    return { access, refresh };
  } catch (error) {
    console.error("Erro no login:", error.response ? error.response.data : error);
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