<?php

include 'conexao.php';

if ($_SERVER["REQUEST_METHOD"] == 'POST') {

    $titulo = trim($_POST["titulo"]);
    $tipo = $_POST["tipo"];
    $genero = trim($_POST["genero"]);
    $data_lancamento = $_POST["data_lancamento"];
    $capa = trim($_POST["capa"]);
    $trailer = trim($_POST["trailer"]);
    $avaliacao = $_POST["avaliacao"];
    $sinopse = trim($_POST["sinopse"]);

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

    $sql = "INSERT INTO filmes_series (titulo, tipo, genero, data_lancamento, capa, trailer, avaliacao, sinopse) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssds", $titulo, $tipo, $genero, $data_lancamento, $capa, $trailer, $avaliacao, $sinopse);

    if ($stmt->execute()) {
        echo json_encode(["sucesso" => true, "mensagem" => "Cadastrado com sucesso!"]);
    } else {
        echo json_encode(["sucesso" => false, "mensagem" => "Erro: " . $stmt->error]);
    }
    $stmt->close();
}

$conn->close();
