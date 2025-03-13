import { reactive } from "vue";

export const authState = reactive({
  isAuthenticated: !!localStorage.getItem("access_token"),
  login(token) {
    localStorage.setItem("access_token", token);
    this.isAuthenticated = true;
  },
  logout() {
    localStorage.removeItem("access_token");
    this.isAuthenticated = false;
  },
});
