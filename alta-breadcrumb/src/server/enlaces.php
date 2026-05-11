<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');


if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Metodo no permitido. Usa GET.']);
    exit;
}


$enlaces = [
    [
        'id' => 1,
        'nombre' => 'Mar de Alborán',
        'url' => 'https://maralboran.eu/'
    ],
    [
        'id' => 2,
        'nombre' => 'React',
        'url' => 'https://react.dev'
    ],
    [
        'id' => 3,
        'nombre' => 'Reactstrap',
        'url' => 'https://reactstrap.github.io'
    ]
];


echo json_encode($enlaces, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
