import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import './App.css';
import { Button } from 'reactstrap';
import { crearTablero, obtenerColor, obtenerDistanciaMinima } from './utils/utils';
import { MATRIX_DIMENSIONS, END_POS, START_POS } from './utils/ctes';

function App() {
  const [minas, setMinas] = useState(10);
  const [matriz, setMatriz] = useState([]);
  const [position, setPosition] = useState({ row: 0, col: 0 });
  const [gameState, setGameState] = useState({ playing: false, gameOver: false });

  const movePosition = (direction) => {
    let nuevaPos = { ...position };

    switch (direction) {
      case 'up':
        nuevaPos.row = Math.max(0, position.row - 1);
        break;
      case 'down':
        nuevaPos.row = Math.min(MATRIX_DIMENSIONS - 1, position.row + 1);
        break;
      case 'left':
        nuevaPos.col = Math.max(0, position.col - 1);
        break;
      case 'right':
        nuevaPos.col = Math.min(MATRIX_DIMENSIONS - 1, position.col + 1);
        break;
      default:
        break;
    }

    if (nuevaPos.row === END_POS.row && nuevaPos.col === END_POS.col) {
      setGameState({ playing: false, gameOver: true });
    } else if (matriz[nuevaPos.row][nuevaPos.col].isMine) {
      setGameState({ playing: false, gameOver: true });
    }
    setPosition(nuevaPos);
  }

  const startGame = () => {
    setMatriz(crearTablero(MATRIX_DIMENSIONS, MATRIX_DIMENSIONS, minas));
    setPosition({ row: START_POS.row, col: START_POS.col });
    setGameState({ playing: true, gameOver: false });
  }

  let mensaje = {};
  if (gameState.gameOver) {
    if (position.row === END_POS.row && position.col === END_POS.col) {
      mensaje.text = "Has ganado!! :D - Pulse jugar para reiniciar";
      mensaje.color = "success";
    } else {
      mensaje.text = "Has perdido!! :(";
      mensaje.color = "danger";
    }
  } else {
    if (gameState.playing) {
      mensaje.text = "Continua jugando...";
      mensaje.color = "info";
    } else {
      mensaje.text = "Pulsa jugar para empezar";
      mensaje.color = "success";
    }
  }

  return (
    <div className="App d-flex flex-column align-items-center gap-3">
      <h1 className='w-100 text-center pt-4 text-center pb-4 bg-info'>Skip the mine</h1>
      <h2 className=''>Minas: {minas}</h2>
      <div className='text-center'>
        <Button className='ps-3 pe-3' onClick={() => setMinas(Math.max(1, minas - 1))}>-{' '}</Button>
        {' '}
        <Button className='ps-3 pe-3' onClick={() => setMinas(Math.min(20, minas + 1))}>+</Button>
      </div>
      <div className='text-center'>
        <Button className='bg-success' onClick={startGame}>Jugar</Button>
      </div>
      <div className='d-flex flex-column align-items-center gap-1'>
        {matriz.map((row, i) =>
          <div key={i} className='d-flex gap-1'>
            {row.map((celda, i) => {
              const distMinima = obtenerDistanciaMinima(matriz, position.row, position.col);

              let color = "secondary";
              let text = "_";

              if (celda.row === position.row && celda.col === position.col && celda.isMine) {
                text = "💀​";
                color = "dark";
              } else if (celda.row === position.row && celda.col === position.col && !gameState.playing) {
                text = "🤑​​";
                color = "success";
              } else if (celda.row === position.row && celda.col === position.col) {
                text = distMinima;
                color = obtenerColor(distMinima);
              }
              return (
                <Button key={i} color={color} style={{ width: '2.6rem' }}>{text}</Button>
              )
            })}
          </div>
        )}
      </div>

      <h3 className={`text-center text-${mensaje.color}`}>{mensaje.text}</h3>
      <div className='d-flex flex-column align-items-center gap-1'>
        <Button color='info' onClick={() => movePosition('up')} disabled={!gameState.playing}>Up</Button>
        <div>
          <Button color='info' onClick={() => movePosition('left')} disabled={!gameState.playing}>Left</Button>
          {' '}
          <Button color='info' onClick={() => movePosition('right')} disabled={!gameState.playing}>Right</Button>
        </div>
        <Button color='info' onClick={() => movePosition('down')} disabled={!gameState.playing}>Down</Button>
      </div>
    </div>
  );
}

export default App;
