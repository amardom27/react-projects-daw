<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$bodyRaw = file_get_contents('php://input');
$body = json_decode($bodyRaw, true);
if (!is_array($body)) {
    $body = [];
}

if ($body['usuario'] == "admin" && $body['password'] == "1234") {
    echo "LOGIN CORRECTO";
} else {
    echo "LOGIN INCORRECTO";
}
