import { reactive } from "vue";

export const authState = reactive({
  isAuthenticated: !!localStorage.getItem("access_token"),

  login(token) {
    if (!token) {
      console.error("Erro: Token inválido no login!");
      return;
    }

    console.log("Método login chamado com token:", token);
    localStorage.setItem("access_token", token);
    this.isAuthenticated = true;
  },

  logout() {
    console.log("Método logout chamado.");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    this.isAuthenticated = false;
  },
});