<?php

include "conexao.php";

header('Content-Type: application/json');

if (isset($_GET["id"])) {
    $id = $_GET["id"];

    $sql = "DELETE FROM filmes_series WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(["sucesso" => true, "mensagem" => "Excluído com sucesso!"]);
    } else {
        echo json_encode(["sucesso" => false, "mensagem" => "Erro ao excluir: " . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["sucesso" => false, "mensagem" => "ID não informado."]);
}

$conn->close();
