const parametrosDaUrl = new URLSearchParams(window.location.search);
const id = parametrosDaUrl.get("id");

const form = document.getElementById("formAtualizar");
const divMensagem = document.getElementById("mensagem");

const campoId = document.getElementById("idAtualizar");
const campoTitulo = document.getElementById("tituloAtualizar");
const campoTipo = document.getElementById("tipoAtualizar");
const campoGenero = document.getElementById("generoAtualizar");
const campoData = document.getElementById("dataAtualizar");
const campoCapa = document.getElementById("capaAtualizar");
const campoTrailer = document.getElementById("trailerAtualizar");
const campoAvaliacao = document.getElementById("avaliacaoAtualizar");
const campoSinopse = document.getElementById("sinopseAtualizar");

async function carregarDadosAtuais() {
    if (!id) {
        divMensagem.textContent = "ID não informado.";
        divMensagem.className = "mensagem-erro";
        return;
    }

    const resposta = await fetch(`../back/atualizar.php?id=${id}`);
    const resultado = await resposta.json();

    if (!resultado.sucesso) {
        divMensagem.textContent = resultado.mensagem;
        divMensagem.className = "mensagem-erro";
        return;
    }

    const item = resultado.dados;

    campoId.value = item.id;
    campoTitulo.value = item.titulo;
    campoTipo.value = item.tipo;
    campoGenero.value = item.genero;
    campoData.value = item.data_lancamento;
    campoCapa.value = item.capa;
    campoTrailer.value = item.trailer;
    campoAvaliacao.value = item.avaliacao;
    campoSinopse.value = item.sinopse;
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const titulo = campoTitulo.value.trim();
    const tipo = campoTipo.value;
    const genero = campoGenero.value.trim();

    if (titulo === "" || tipo === "" || genero === "") {
        divMensagem.textContent = "Preencha os campos obrigatórios: título, tipo e gênero.";
        divMensagem.className = "mensagem-erro";
        return;
    }

    const dadosForm = new FormData(form);

    fetch("../back/atualizar.php", {
        method: "POST",
        body: dadosForm
    })
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (dados) {
            divMensagem.textContent = dados.mensagem;

            if (dados.sucesso) {
                divMensagem.className = "mensagem-sucesso";
                setTimeout(function () {
                    window.location.href = "../index.html";
                }, 1500);
            } else {
                divMensagem.className = "mensagem-erro";
            }
        })
        .catch(function (erro) {
            divMensagem.textContent = "Erro ao conectar com o servidor.";
            divMensagem.className = "mensagem-erro";
            console.error(erro);
        });
});

carregarDadosAtuais();
