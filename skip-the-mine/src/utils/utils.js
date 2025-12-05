// export function crearMatriz(rows, cols) {
//   const nuevaMatriz = [];
//   for (let r = 0; r < rows; r++) {
//     const rowArr = [];
//     for (let c = 0; c < cols; c++) {
//       rowArr.push({
//         row: r,
//         col: c,
//         isMine: false
//       });
//     }
//     nuevaMatriz.push(rowArr);
//   }
//   return nuevaMatriz;
// }

export const NUM = 10;
const START_POS = { row: 0, col: 0 };
const END_POS = { row: NUM - 1, col: NUM - 1 };

const dir = [
  [-1, 0], // arriba
  [0, 1],  // derecha
  [1, 0],  // abajo
  [0, -1]  // izquierda
];

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function crearTablero(rows, cols, numMinas) {
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

  const limite = 100;
  let lim = 0;

  while (true && lim < limite) {
    for (let i = 0; i < numMinas; i++) {
      const posMinaI = getRandomIntInclusive(0, rows - 1);
      const posMinaJ = getRandomIntInclusive(0, cols - 1);

      if (nuevaMatriz[posMinaI][posMinaJ].isMine) {
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

  for (let k = 0; k < dir.length; k++) {
    const [dirI, dirJ] = dir[k];

    const nuevaI = currI + dirI;
    const nuevaJ = currJ + dirJ;

    if (comprobarCamino(matriz, nuevaI, nuevaJ, visitadas)) {
      return true;
    }
  }
  return false;
}

function calcularDistancia(currI, currJ, mineI, mineJ) {
  const dx = mineJ - currJ;
  const dy = mineI - currI;

  return Math.sqrt(dx * dx + dy * dy);
}

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