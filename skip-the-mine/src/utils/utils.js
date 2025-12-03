export function crearMatriz(rows, cols) {
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
  return nuevaMatriz;
}