<?php

include 'conexao.php';

header('Content-Type: application/json');

$pesquisa = isset($_GET["pesquisa"]) ? trim($_GET["pesquisa"]) : "";
$tipo = isset($_GET["tipo"]) ? trim($_GET["tipo"]) : "";

$sql = "SELECT * FROM filmes_series WHERE 1=1";
$parametros = [];
$tiposParametros = "";

if ($pesquisa !== "") {
    $sql .= " AND titulo LIKE ?";
    $parametros[] = "%" . $pesquisa . "%";
    $tiposParametros .= "s";
}

if ($tipo === "filme" || $tipo === "serie") {
    $sql .= " AND tipo = ?";
    $parametros[] = $tipo;
    $tiposParametros .= "s";
}

$sql .= " ORDER BY criado_em DESC";

$stmt = $conn->prepare($sql);

if (!empty($parametros)) {
    $stmt->bind_param($tiposParametros, ...$parametros);
}

$stmt->execute();
$resultado = $stmt->get_result();

$dados = [];
if ($resultado->num_rows > 0) {
    while ($linha = $resultado->fetch_assoc()) {
        $dados[] = $linha;
    }
}

echo json_encode($dados);
$stmt->close();
$conn->close();
