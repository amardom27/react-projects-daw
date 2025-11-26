import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from 'react';
import { rellenarMatriz } from './utils/utils';
import { Button } from 'reactstrap';

function App() {
  const [matriz, setMatriz] = useState(rellenarMatriz);
  const [posOne, setPosOne] = useState(null);
  const [posTwo, setPosTwo] = useState(null);
  const [isDisable, setIsDisable] = useState(false);

  function seleccionarCarta(prev, i, j, posOne, posTwo) {
    // Evitar seleccionar la misma carta que posOne
    if (posOne && posOne.posI === i && posOne.posJ === j) {
      return { nueva: prev, nuevaPosOne: posOne, nuevaPosTwo: posTwo };
    }

    const nueva = prev.map(fila => fila.map(c => ({ ...c })));
    nueva[i][j].seleccionado = true;

    let nuevaPosOne = posOne;
    let nuevaPosTwo = posTwo;

    if (!posOne) {
      nuevaPosOne = { posI: i, posJ: j };
    } else if (!posTwo) {
      nuevaPosTwo = { posI: i, posJ: j };
    }

    return { nueva, nuevaPosOne, nuevaPosTwo };
  }

  const handleSelect = (i, j) => {
    if (isDisable) return;

    const { nueva, nuevaPosOne, nuevaPosTwo } = seleccionarCarta(matriz, i, j, posOne, posTwo);
    setMatriz(nueva);
    setPosOne(nuevaPosOne);
    setPosTwo(nuevaPosTwo);

    // Si ya hay dos cartas seleccionadas, revisamos coincidencia
    if (nuevaPosOne && nuevaPosTwo) {
      setIsDisable(true); // bloqueamos clicks momentáneamente

      setTimeout(() => {
        const val1 = nueva[nuevaPosOne.posI][nuevaPosOne.posJ].valor;
        const val2 = nueva[nuevaPosTwo.posI][nuevaPosTwo.posJ].valor;
        const nuevaMatriz = nueva.map(fila => fila.map(c => ({ ...c })));

        if (val1 === val2) {
          // Si coinciden, se muestran
          nuevaMatriz[nuevaPosOne.posI][nuevaPosOne.posJ].mostrado = true;
          nuevaMatriz[nuevaPosTwo.posI][nuevaPosTwo.posJ].mostrado = true;
        }

        // Volvemos a poner boca abajo las seleccionadas si no coinciden
        nuevaMatriz[nuevaPosOne.posI][nuevaPosOne.posJ].seleccionado = false;
        nuevaMatriz[nuevaPosTwo.posI][nuevaPosTwo.posJ].seleccionado = false;

        setMatriz(nuevaMatriz);
        setPosOne(null);
        setPosTwo(null);
        setIsDisable(false);
      }, 800); // 0.8s de delay para que se vea la segunda carta
    }
  }

  return (
    <div className="App d-flex flex-column align-items-center p-4">
      <h1 className='mb-4'>Juego de Parejas</h1>
      {matriz.map((fila, i) => {
        return (
          <div key={i}>
            {fila.map((celda, j) => {
              let texto = 'Carta';
              let color = 'secondary';

              if (celda.seleccionado) {
                texto = celda.valor;
                color = 'primary';
              }

              if (celda.mostrado) {
                texto = celda.valor;
                color = 'success';
              }

              return (<Button className='m-1' style={{ width: '4rem' }} key={j} color={color} onClick={() => handleSelect(i, j)}>{texto}</Button>)
            })}
          </div>
        )
      })}
    </div>
  );
}

export default App;
