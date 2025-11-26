const empezarMatriz = () => Array.from({ length: 8 }, () => Array(8).fill(null));

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

export const rellenarMatriz = () => {
  const nuevaMatriz = empezarMatriz();
  const max = (nuevaMatriz.length * nuevaMatriz[0].length) / 2;
  const maxIte = 100;

  for (let i = 1; i <= max; i++) {
    let j = 0;
    while (true && j < maxIte) {
      const nuevaI = getRandomIntInclusive(0, nuevaMatriz.length - 1);
      const nuevaJ = getRandomIntInclusive(0, nuevaMatriz[0].length - 1);

      if (nuevaMatriz[nuevaI][nuevaJ] === null) {
        nuevaMatriz[nuevaI][nuevaJ] = { seleccionado: false, mostrado: false, valor: i };
        break;
      }

      j++;
    }
  }

  for (let i = 1; i <= max; i++) {
    let j = 0;
    while (true && j < maxIte) {
      const nuevaI = getRandomIntInclusive(0, nuevaMatriz.length - 1);
      const nuevaJ = getRandomIntInclusive(0, nuevaMatriz[0].length - 1);

      if (nuevaMatriz[nuevaI][nuevaJ] === null) {
        nuevaMatriz[nuevaI][nuevaJ] = { seleccionado: false, mostrado: false, valor: i };
        break;
      }

      j++;
    }
  }
  return nuevaMatriz;
}