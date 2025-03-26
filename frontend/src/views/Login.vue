<template>
  <div class="container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Senha" required />
      <button type="submit">Entrar</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from "axios";
import { ref, inject, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const authState = inject("authState");
    const email = ref("");
    const password = ref("");
    const error = ref("");
    const csrfToken = ref("");
    const router = useRouter();

    // Obtém o CSRF Token antes de enviar requisições protegidas
    const getCsrfToken = async () => {
      try {
        const response = await axios.get("https://no-alambrado.onrender.com/api/accounts/csrf/", {
          withCredentials: true, // Garante que cookies são enviados
        });
        console.log("CSRF Token recebido:", response.data);
      } catch (error) {
        console.error("Erro ao obter CSRF Token:", error);
      }
    };

    onMounted(() => {
      getCsrfToken();
    });

    const handleLogin = async () => {
      error.value = "";
      try {
        const response = await axios.post(
          "https://no-alambrado.onrender.com/api/accounts/login/",
          { email: email.value, password: password.value },
          { withCredentials: true }
        );

        if (response.status === 200 && response.data.access_token) {
          console.log("Login bem-sucedido!");
          localStorage.setItem("access_token", response.data.access_token);
          authState.isAuthenticated = true;
          router.push("/");
        } else {
          throw new Error("Credenciais inválidas.");
        }
      } catch (err) {
        error.value = err.response?.data?.detail || "Erro ao autenticar.";
      }
    };

    return {
      email,
      password,
      error,
      handleLogin,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 10px;
}

input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background: #1a764d;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background: #135c3a;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
