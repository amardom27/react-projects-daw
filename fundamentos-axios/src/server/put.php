<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, OPTIONS');
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

$id = isset($_GET['id']) ? (int)$_GET['id'] : 1;
$updated = null;
foreach ($data['posts'] as $i => $post) {
    if ((int)$post['id'] === $id) {
        $data['posts'][$i]['title'] = $body['title'] ?? $post['title'];
        $data['posts'][$i]['body'] = $body['body'] ?? $post['body'];
        $data['posts'][$i]['userId'] = $body['userId'] ?? $post['userId'];
        $updated = $data['posts'][$i];
        break;
    }
}

if ($updated === null) {
    http_response_code(404);
    echo json_encode(['error' => 'Post not found']);
    exit;
}

file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));
echo json_encode($updated);
