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
  import { ref, inject } from "vue";
  import { useRouter } from "vue-router";
  
  export default {
    setup() {
      const authState = inject("authState");
      const email = ref("");
      const password = ref("");
      const error = ref("");
      const router = useRouter();
  
      const handleLogin = async () => {
        error.value = "";
        try {
          const response = await axios.post("http://127.0.0.1:8000/api/accounts/login/", {
            email: email.value,
            password: password.value,
          });
  
          if (response.status === 200 && response.data.access) {
            authState.login(response.data.access);
            router.push("/");
          } else {
            error.value = "Erro ao autenticar. Tente novamente.";
          }
        } catch (err) {
          error.value = "Login falhou! Verifique suas credenciais.";
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
  