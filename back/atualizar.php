<?php

include 'conexao.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        $id = $_GET['id'];

        $sql = "SELECT * FROM filmes_series WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $resultado = $stmt->get_result();
        $item = $resultado->fetch_assoc();

        if ($item) {
            echo json_encode(["sucesso" => true, "dados" => $item]);
        } else {
            echo json_encode(["sucesso" => false, "mensagem" => "Item não encontrado."]);
        }

        $stmt->close();
    } else {
        echo json_encode(["sucesso" => false, "mensagem" => "ID não informado."]);
    }
    $conn->close();
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    $titulo = trim($_POST['titulo']);
    $tipo = $_POST['tipo'];
    $genero = trim($_POST['genero']);
    $data_lancamento = $_POST['data_lancamento'];
    $capa = trim($_POST['capa']);
    $trailer = trim($_POST['trailer']);
    $avaliacao = $_POST['avaliacao'];
    $sinopse = trim($_POST['sinopse']);

    $erros = [];

    if (empty($titulo)) {
        $erros[] = "O título é obrigatório.";
    }
    if ($tipo !== "filme" && $tipo !== "serie") {
        $erros[] = "O tipo deve ser filme ou série.";
    }
    if (empty($genero)) {
        $erros[] = "O gênero é obrigatório.";
    }
    if ($avaliacao !== "" && (!is_numeric($avaliacao) || $avaliacao < 0 || $avaliacao > 10)) {
        $erros[] = "A avaliação deve estar entre 0 e 10.";
    }
    if (!empty($data_lancamento)) {
        $data_valida = DateTime::createFromFormat('Y-m-d', $data_lancamento);
        if (!$data_valida || $data_valida->format('Y-m-d') !== $data_lancamento) {
            $erros[] = "A data de lançamento não é válida.";
        }
    }

    if (!empty($erros)) {
        echo json_encode(["sucesso" => false, "mensagem" => implode(" ", $erros)]);
        exit;
    }

    $sql = "UPDATE filmes_series SET titulo=?, tipo=?, genero=?, data_lancamento=?, capa=?, trailer=?, avaliacao=?, sinopse=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ssssssdsi', $titulo, $tipo, $genero, $data_lancamento, $capa, $trailer, $avaliacao, $sinopse, $id);

    if ($stmt->execute()) {
        echo json_encode(["sucesso" => true, "mensagem" => "Atualizado com sucesso!"]);
    } else {
        echo json_encode(["sucesso" => false, "mensagem" => "Erro: " . $stmt->error]);
    }

    $stmt->close();
}

$conn->close();
