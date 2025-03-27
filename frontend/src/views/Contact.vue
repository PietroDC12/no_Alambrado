<template>
  <div class="container">
    <div class="left-column">
      <!-- Círculo para imagem -->
      <img class="profile-image"
        src="https://img.freepik.com/vetores-premium/icone-perfil-simples-cor-branco-icone_1076610-50204.jpg?semt=ais_hybrid"
        alt="Imagem de Perfil" />
      <!-- Quadrado abaixo -->
      <h5>APOIE O PROJETO</h5>
      <h5 class="left-column">PIX</h5>
      <div class="small-box">
        <img class="qrcode-image"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg/1200px-Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg.png"
          alt="Imagem de Qr code" />
      </div>
    </div>

    <!-- Retângulo grande -->
    <div class="large-box">
      <h3>Contato</h3>
      <p class="text-large-box"><font-awesome-icon :icon="['fas', 'envelope']" /> pidellacorte@hotmail.com</p>
      <p class="text-large-box"><font-awesome-icon :icon="['fab', 'linkedin']" /> <a href="https://www.linkedin.com/in/pietro-antonio-della-corte-silva/">LinkedIn</a></p>
      <p class="text-large-box"><font-awesome-icon :icon="['fab', 'github']" /> <a href="https://github.com/PietroDC12">Github</a></p>
    </div>
  </div>
</template>

<script setup>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faLink, faCode } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEnvelope, faLink, faCode, faGithub, faLinkedin)

</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  padding: 20px;
  margin-left: 300px;
  margin-right: 300px;
  margin-top: 40px;
  border-radius: 10px;
  background-image: linear-gradient(to bottom right, rgb(157, 231, 173), #1a764d);
}

.left-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
}

.left-column h5 {
  margin-bottom: 1px;
}

.profile-image {
  width: 120px;
  height: 120px;
  border-style: solid;
  border-width: 1px;
  border-radius: 50%;
  /* Torna a imagem circular */
  background-color: black;
  /* Apenas para visualização caso a imagem não carregue */
}

.qrcode-image {
  width: 120px;
  height: 120px;
  background-color: rgb(255, 255, 255);
  /* Apenas para visualização caso a imagem não carregue */
}

.small-box {
  width: 120px;
  height: 120px;
  border-style: solid;
  background-color: #ddd;
  /* Cinza claro */
}

.large-box {
  width: 500px;
  height: 300px;
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
  padding: 20px;
  /* Adiciona espaçamento interno */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* Alinha o conteúdo ao lado esquerdo */
  justify-content: center;
  position: relative;
  /* Permite posicionamento absoluto do título */

}

.large-box h3 {
  align-self: center;
  /* Alinha o título "Contato" ao centro */
  position: absolute;
  top: 20px;
  /* Posiciona o título no topo do card */
  left: 50%;
  font-size: 30px;
  transform: translateX(-50%);
  /* Move o título para o centro exato */
}

.text-large-box {
  font-size: 18px;
  margin: 5px 0;
  /* Ajusta o espaçamento entre os textos */
}
</style>