<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$dataFile = __DIR__ . '/data.json';
if (!file_exists($dataFile)) {
    file_put_contents($dataFile, json_encode(
        ['posts' => []],
        JSON_PRETTY_PRINT
    ));
}

$raw = file_get_contents($dataFile);
$data = json_decode($raw, true);
if (!is_array($data) || !isset($data['posts'])) {
    $data = ['posts' => []];
}

$bodyRaw = file_get_contents('php://input');
$body = json_decode($bodyRaw, true);
if (!is_array($body)) {
    $body = [];
}

$maxId = 0;
foreach ($data['posts'] as $p) {
    $maxId = max($maxId, (int)$p['id']);
}

$new = [
    'id' => $maxId + 1,
    'title' => $body['title'] ?? 'Sin titulo',
    'body' => $body['body'] ?? '',
    'userId' => $body['userId'] ?? 1
];

$data['posts'][] = $new;

file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));
http_response_code(201);
echo json_encode($new);
