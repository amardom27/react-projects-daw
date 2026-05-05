<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$jsonPath = __DIR__ . '/initialpatines.json';

readfile($jsonPath);

?>
