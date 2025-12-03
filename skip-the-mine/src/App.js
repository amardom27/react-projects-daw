import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import './App.css';
import { Button } from 'reactstrap';
import { crearMatriz } from './utils/utils';

const NUM = 10;
const END_POS = { row: NUM - 1, col: NUM - 1 };

// TODO poner minas y comprobar si están bien puestas
// TODO calcular la distancia a la mina mas próxima
// TODO hacer que se pueda terminar el juego

function App() {
  const [minas, setMinas] = useState(10);
  const [matriz, setMatriz] = useState(crearMatriz(NUM, NUM));
  const [position, setPosition] = useState({ row: 0, col: 0 });

  const movePosition = (direction) => {
    setPosition((prev) => {
      switch (direction) {
        case 'up':
          return { ...prev, row: Math.max(0, prev.row - 1) };
        case 'down':
          return { ...prev, row: Math.min(NUM - 1, prev.row + 1) };
        case 'left':
          return { ...prev, col: Math.max(0, prev.col - 1) };
        case 'right':
          return { ...prev, col: Math.min(NUM - 1, prev.col + 1) };
        default:
          return prev;
      }
    });
  };

  return (
    <div className="App">
      <h1 className='text-center pt-4 pb-4 bg-info'>Skip the mine</h1>
      <h2 className='text-center'>Minas: {minas}</h2>
      <div className='text-center'>
        <Button className='ps-3 pe-3' onClick={() => setMinas(Math.min(20, minas + 1))}>+</Button>
        {' '}
        <Button className='ps-3 pe-3' onClick={() => setMinas(Math.max(0, minas - 1))}>-{' '}</Button>
      </div>
      <div className='text-center mt-3'>
        <Button className='bg-success'>Jugar</Button>
      </div>
      <div className='d-flex flex-column align-items-center gap-1 mt-3'>
        {matriz.map((row, i) =>
          <div key={i} className='d-flex gap-1'>
            {row.map((celda, i) => {
              let text = "_";
              if (celda.row === position.row && celda.col === position.col) {
                text = "P";
              }
              return (
                <Button key={i} style={{ width: '2.6rem' }}>{text}</Button>
              )
            })}
          </div>
        )}
      </div>
      <div className='d-flex flex-column align-items-center gap-1 mt-3'>
        <Button color='info' onClick={() => movePosition('up')}>Up</Button>
        <div>
          <Button color='info' onClick={() => movePosition('left')}>Left</Button>
          {' '}
          <Button color='info' onClick={() => movePosition('right')}>Right</Button>
        </div>
        <Button color='info' onClick={() => movePosition('down')}>Down</Button>
      </div>
    </div >
  );
}

export default App;
