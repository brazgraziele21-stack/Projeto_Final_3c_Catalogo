<?php

include 'conexao.php';

header('Content-Type: application/json');

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
