// Filas y Columnas de la matriz de juego
export const MATRIX_DIMENSIONS = 10;

// Minimo y maximo de minas
export const MIN_MINES = 1;
export const MAX_MINES = 50;

// Posicion de Inicio y Fin
export const START_POS = { row: 0, col: 0 };
export const END_POS = { row: MATRIX_DIMENSIONS - 1, col: MATRIX_DIMENSIONS - 1 };

// Direcciones para el recorrido recursivo
export const DIRECTIONS = [
    [-1, 0], // arriba
    [0, 1],  // derecha
    [1, 0],  // abajo
    [0, -1]  // izquierda
];