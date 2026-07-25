<?php

$servidor = "localhost";
$usuario = "Grazi";
$senha = "@Grazi42";
$nomeDoBanco = "catalogo_filmes";

$conn = new mysqli($servidor, $usuario, $senha, $nomeDoBanco);

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}
