<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Permitir preflight de CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Solo permitir POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'error' => 'Método no permitido. Usa POST.'
    ]);
    exit;
}

// Leer JSON enviado desde React
$input = json_decode(file_get_contents('php://input'), true);

// Validar que existan los datos
if (
    !isset($input['usuario']) ||
    !isset($input['password'])
) {
    http_response_code(400);
    echo json_encode([
        'error' => 'Faltan usuario o contraseña.'
    ]);
    exit;
}

$usuario = $input['usuario'];
$password = $input['password'];

$enlaces = [
    [
        'usuario' => 'usuario',
        'password' => 'usuario',
        'offcavas' => 'Ficha del usuario',
        'enlaces' => [
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
        ]
    ],
    [
        'usuario' => 'admin',
        'password' => '1234',
        'offcavas' => 'Ficha del administrador',
        'enlaces' => [
            [
                'id' => 1,
                'nombre' => 'Panel de Admin',
                'url' => 'https://maralboran.eu/admin/'
            ],
            [
                'id' => 2,
                'nombre' => 'Página oficial React',
                'url' => 'https://react.dev'
            ],
            [
                'id' => 3,
                'nombre' => 'Programa con Reactstrap',
                'url' => 'https://reactstrap.github.io'
            ]
        ]
    ]
];

// Buscar coincidencia
foreach ($enlaces as $item) {

    if (
        $item['usuario'] === $usuario &&
        $item['password'] === $password
    ) {

        // Opcional: no devolver la contraseña
        // unset($item['password']);

        echo json_encode(
            $item,
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
        );

        exit;
    }
}

// Si no encuentra usuario
http_response_code(401);

echo json_encode([
    'error' => 'Usuario o contraseña incorrectos.'
]);
