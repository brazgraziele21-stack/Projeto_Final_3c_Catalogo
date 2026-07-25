const campoFiltro = document.getElementById("campoFiltro");
const filtroTipo = document.getElementById("filtroTipo");

async function carregarDados() {
    const pesquisa = campoFiltro.value.trim();
    const tipo = filtroTipo.value;

    const parametros = new URLSearchParams();
    if (pesquisa !== "") parametros.append("pesquisa", pesquisa);
    if (tipo !== "") parametros.append("tipo", tipo);

    const resposta = await fetch("back/listar.php?" + parametros.toString());
    const dados = await resposta.json();

    mostrarCards(dados);
}

function mostrarCards(listaDeDados) {

    const container = document.querySelector(".containerCards");
    container.innerHTML = "";

    if (listaDeDados.length === 0) {
        container.innerHTML = "<p>Nenhum registro encontrado</p>";
        return;
    }

    listaDeDados.forEach((item) => {

        const card = document.createElement("div");
        card.className = "card";

        const capa = document.createElement("img");
        capa.src = item.capa !== "" ? item.capa : "https://via.placeholder.com/150x220?text=Sem+capa";
        capa.alt = item.titulo;

        const titulo = document.createElement("h3");
        titulo.textContent = item.titulo;

        const tipoTexto = document.createElement("p");
        tipoTexto.textContent = item.tipo === "filme" ? "Filme" : "Série";

        const genero = document.createElement("p");
        genero.textContent = item.genero;

        const avaliacao = document.createElement("p");
        avaliacao.textContent = "Nota: " + item.avaliacao;

        const divBotoes = document.createElement("div");
        divBotoes.className = "btn-acoes";

        const btnVisualizar = document.createElement("button");
        btnVisualizar.textContent = "Visualizar";
        btnVisualizar.addEventListener("click", function () {
            window.location.href = `front/visualizar.html?id=${item.id}`;
        });

        const btnAtualizar = document.createElement("button");
        btnAtualizar.textContent = "Editar";
        btnAtualizar.addEventListener("click", function () {
            window.location.href = `front/atualizar.html?id=${item.id}`;
        });

        const btnDeletar = document.createElement("button");
        btnDeletar.textContent = "Excluir";
        btnDeletar.addEventListener("click", async function () {
            if (confirm(`Tem certeza que deseja excluir "${item.titulo}"?`)) {
                await fetch(`back/deletar.php?id=${item.id}`);
                carregarDados();
            }
        });

        divBotoes.appendChild(btnVisualizar);
        divBotoes.appendChild(btnAtualizar);
        divBotoes.appendChild(btnDeletar);

        card.appendChild(capa);
        card.appendChild(titulo);
        card.appendChild(tipoTexto);
        card.appendChild(genero);
        card.appendChild(avaliacao);
        card.appendChild(divBotoes);

        container.appendChild(card);
    });
}

campoFiltro.addEventListener("input", carregarDados);
filtroTipo.addEventListener("change", carregarDados);

carregarDados();
