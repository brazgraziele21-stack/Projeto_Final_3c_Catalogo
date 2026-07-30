const body = document.querySelector("body");
const btnTema = document.querySelector("#btn-tema");

btnTema.addEventListener("click", function () {
  body.classList.toggle("tema-escuro");
});

const parametrosDaUrl = new URLSearchParams(window.location.search);
const id = parametrosDaUrl.get("id");

const divMensagem = document.getElementById("mensagem");
const detCapa = document.getElementById("detCapa");
const detTitulo = document.getElementById("detTitulo");
const detTipo = document.getElementById("detTipo");
const detGenero = document.getElementById("detGenero");
const detData = document.getElementById("detData");
const detAvaliacao = document.getElementById("detAvaliacao");
const detSinopse = document.getElementById("detSinopse");
const detTrailer = document.getElementById("detTrailer");
const detTrailerWrapper = document.getElementById("detTrailerWrapper");

async function carregarDetalhes() {
  if (!id) {
    divMensagem.textContent = "ID não informado.";
    divMensagem.className = "mensagem-erro";
    return;
  }

  const resposta = await fetch(`../back/visualizar.php?id=${id}`);
  const resultado = await resposta.json();

  if (!resultado.sucesso) {
    divMensagem.textContent = resultado.mensagem;
    divMensagem.className = "mensagem-erro";
    return;
  }

  const item = resultado.dados;

  detCapa.src =
    item.capa !== ""
      ? item.capa
      : "https://via.placeholder.com/200x300?text=Sem+capa";
  detCapa.alt = item.titulo;
  detTitulo.textContent = item.titulo;
  detTipo.textContent = item.tipo === "filme" ? "Filme" : "Série";
  detGenero.textContent = item.genero;
  detData.textContent = item.data_lancamento
    ? item.data_lancamento
    : "Não informada";
  detAvaliacao.textContent =
    item.avaliacao !== null ? item.avaliacao + " / 10" : "Sem avaliação";
  detSinopse.textContent =
    item.sinopse !== "" ? item.sinopse : "Sem sinopse cadastrada.";

  if (item.trailer !== "") {
    detTrailer.href = item.trailer;
  } else {
    detTrailerWrapper.style.display = "none";
  }
}

carregarDetalhes();
