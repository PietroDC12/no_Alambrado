<template>
    <div class="container">
        <h1 class="tittle-project">Conheça Mais</h1>
        <p class="text-project">
            Se você é apaixonado por esportes, está no lugar certo! Este blog foi criado por um fã que vive e respira esporte, com o objetivo de compartilhar opiniões, análises e debates sobre os principais acontecimentos do mundo esportivo.
            <br><br>
            Aqui, você não encontrará notícias formais ou cobertura jornalística, mas sim uma visão autêntica e opinativa sobre jogos, jogadores, competições e tudo o que envolve essa paixão. Queremos criar um espaço para torcedores discutirem, trocarem ideias e viverem a emoção do esporte de maneira leve e descontraída.
            <br><br>
            Sinta-se à vontade para interagir nas redes sociais, porque, no fim das contas, o esporte é muito mais emocionante quando compartilhado! 
        </p>
    </div>
    
</template>

<script>
    export default{
        mounted() {
    document.title = 'Conheça o projeto'
  },
    }
</script>


<style>
.container{
    margin-left: 130px;
    margin-right: 130px;
}
.text-project{
    text-align: center;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 20px;
    padding: 10px;
}

.tittle-project{
    font-size: 40px;
    font-family: sans-serif;

}
</style>