<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE, OPTIONS');
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

$id = isset($_GET['id']) ? (int)$_GET['id'] : 1;
$found = false;
$data['posts'] = array_values(array_filter($data['posts'], function ($post)
use ($id, &$found) {
    if ((int)$post['id'] === $id) {
        $found = true;
        return false;
    }
    return true;
}));

if (!$found) {
    http_response_code(404);
    echo json_encode(['error' => 'Post not found']);

    exit;
}

file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));
echo json_encode(['ok' => true]);
