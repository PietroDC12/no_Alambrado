<template>
    <div class="min-h-screen flex flex-col">
      <!-- Header corrigido (não fixo) -->
      <header class="header">HEADER</header>
  
      <!-- Seção de 3 colunas -->
      <section class="columns">
        <div class="column">
          <h2 class="card-title">Últimas Notícias</h2>
          <img src="https://img.cdndsgni.com/preview/10321711.jpg" alt="Imagem de teste" class="card-image">
          <p class="card-text">Esse é um texto abaixo da imagem.</p>
  
          <img src="https://img.cdndsgni.com/preview/10321711.jpg" alt="Imagem de teste" class="card-image">
          <p class="card-text">Esse é um texto abaixo da imagem.</p>
        </div>
  
        <div class="column">
            <h2 class="card-title"> Veja Também</h2>
        </div>
  
        <div class="column">
            <h2 class="card-title">Mais Clicadas</h2>
        </div>
      </section>
  
      <!-- Conteúdo principal -->
      <main class="flex-1 bg-white p-4">
        <p>Conteúdo aqui...</p>
      </main>
    </div>
  </template>
  
  <style scoped>
  /* Header corrigido (agora ele fica no fluxo normal da página) */
  .header {
    background-color: rgb(81, 22, 22);
    height: 84px;
    width: 100%; /* Agora ocupa toda a largura */
    margin: 0; /* Remove margens laterais */
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 18px;
    box-sizing: border-box; /* Evita que padding aumente o tamanho */
    }

    .columns {
    display: flex;
    justify-content: space-between;
    gap: 30px; /* Espaço entre as colunas */
    padding: 20px; /* Reduzindo padding lateral */
    width: 100%; /* Ocupa toda a largura disponível */
    box-sizing: border-box;
    }
    
  /* Estilizando as colunas */
  .column {
    flex: 1; /* Todas ocupam a mesma largura */
    background-color: #f0f0f0;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    font-weight: bold;
  }
  
  /* Responsivo: no celular, colunas ficam empilhadas */
  @media (max-width: 768px) {
    .columns {
      flex-direction: column;
      gap: 10px;
    }
  }
  
  .card-title {
    margin-top: 5px;
    font-size: 30px;
    color: #292929;
  }
  
  .card-image {
    width: 320px; /* Define um tamanho fixo para a largura */
    height: 240px; /* Define um tamanho fixo para a altura */
    object-fit: cover; /* Corta a imagem para preencher o espaço */
    border-radius: 8px;
  }
  
  .card-text {
    margin-top: 10px;
    font-size: 16px;
    color: #414141;
  }
  </style>
  