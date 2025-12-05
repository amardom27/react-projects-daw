import { DIRECTIONS, END_POS, START_POS } from "./ctes";

// Obtener un numero random entre dos valores incluyendo ambos [min, max]
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function crearTablero(rows, cols, numMinas) {
  // Creamos inicialmente la matriz vacia
  const nuevaMatriz = [];
  for (let r = 0; r < rows; r++) {
    const rowArr = [];
    for (let c = 0; c < cols; c++) {
      rowArr.push({
        row: r,
        col: c,
        isMine: false
      });
    }
    nuevaMatriz.push(rowArr);
  }

  // Variables de seguridad para el while (true)
  const limite = 1000;
  let lim = 0;

  // Recorremos la matriz de forma recursiva para comprobar que haya un camino posible desde
  // la posicion inicial hasta la poscion final
  while (true && lim < limite) {
    for (let i = 0; i < numMinas; i++) {
      const posMinaI = getRandomIntInclusive(0, rows - 1);
      const posMinaJ = getRandomIntInclusive(0, cols - 1);

      if (nuevaMatriz[posMinaI][posMinaJ].isMine ||
        posMinaI === START_POS.row || posMinaJ === START_POS.col ||
        posMinaI === END_POS.row || posMinaJ === END_POS.col) {
        i--;
        continue;
      }
      nuevaMatriz[posMinaI][posMinaJ].isMine = true;
    }

    const visitadas = Array.from({ length: rows }, () => Array(cols).fill(false));
    if (comprobarCamino(nuevaMatriz, START_POS.row, START_POS.col, visitadas)) {
      break;
    }

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        nuevaMatriz[r][c].isMine = false;
      }
    }
    lim++;
  }
  return nuevaMatriz;
}

// Comprueba si hay un camino desde la posicion que mandamos por parametros (currI, currJ) hasta la posicion final
function comprobarCamino(matriz, currI, currJ, visitadas) {
  if (currI < 0 || currI >= matriz.length || currJ < 0 || currJ >= matriz[0].length) {
    return false;
  }

  if (visitadas[currI][currJ]) {
    return false;
  }

  if (matriz[currI][currJ].isMine) {
    return false;
  }

  if (currI === END_POS.row && currJ === END_POS.col) {
    return true;
  }

  visitadas[currI][currJ] = true;

  for (let k = 0; k < DIRECTIONS.length; k++) {
    const [dirI, dirJ] = DIRECTIONS[k];

    const nuevaI = currI + dirI;
    const nuevaJ = currJ + dirJ;

    if (comprobarCamino(matriz, nuevaI, nuevaJ, visitadas)) {
      return true;
    }
  }
  return false;
}

// Calcular la distancia entre dos puntos
function calcularDistancia(currI, currJ, mineI, mineJ) {
  const dx = mineJ - currJ;
  const dy = mineI - currI;

  return Math.sqrt(dx * dx + dy * dy);
}

// Obtener la distancia minima entre el punto que mandamos por parametros (currI, currJ)
// hasta la mina mas proxima
export function obtenerDistanciaMinima(matriz, currI, currJ) {
  let minDist = matriz.length;
  for (let r = 0; r < matriz.length; r++) {
    for (let c = 0; c < matriz.length; c++) {
      if (matriz[r][c].isMine) {
        const dis = parseInt(calcularDistancia(currI, currJ, r, c));
        if (dis < minDist) {
          minDist = dis;
        }
      }
    }
  }
  return minDist;
}

// Obtener un color dependiendo del numero que mandamos
// Se utiliza dependiendo de la distancia minima
export function obtenerColor(num) {
  switch (true) {
    case num >= 4:
      return "primary";

    case num === 3:
      return "info";

    case num === 2:
      return "warning";

    case num === 1:
      return "danger";

    default:
      return "secondary";
  }
}