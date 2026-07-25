const form = document.getElementById("formCadastro");
const divMensagem = document.getElementById("mensagem");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const campoTitulo = document.getElementById("titulo");
    const campoTipo = document.getElementById("tipo");
    const campoGenero = document.getElementById("genero");

    const titulo = campoTitulo.value.trim();
    const tipo = campoTipo.value;
    const genero = campoGenero.value.trim();

    if (titulo === "" || tipo === "" || genero === "") {
        divMensagem.textContent = "Preencha os campos obrigatórios: título, tipo e gênero.";
        divMensagem.className = "mensagem-erro";
        return;
    }

    const dadosForm = new FormData(form);

    fetch("../back/cadastro.php", {
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
                form.reset();
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
