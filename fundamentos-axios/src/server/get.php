<?php

// Start server
// php -S localhost:4000 -t src/server

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

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

$id = isset($_GET['id']) ? (int)$_GET['id'] : 1;
foreach ($data['posts'] as $post) {
    if ((int)$post['id'] === $id) {
        echo json_encode($post);
        exit;
    }
}

http_response_code(404);
echo json_encode(['error' => 'Post not found']);
