import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Button } from 'reactstrap';
import { useEffect, useState } from 'react';

function App() {
  const [colores, setColoes] = useState(["secondary", "secondary", "secondary"])
  const [error, setError] = useState(null)

  useEffect(() => {
    startWorker()

    return () => stopWorker()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleClick(pos) {
    const nuevoColores = colores.map((_, i) => (i === pos ? "primary" : "secondary"));
    setColoes(nuevoColores)
  }

  let w;

  function startWorker() {
    if (typeof (Worker) !== "undefined") {

      if (typeof (w) == "undefined") {
        w = new Worker(`${process.env.PUBLIC_URL}/trabajador.js`);
      }
      w.onmessage = function (event) {
        handleClick(event.data)
      }
    } else {
      setError("Fallo en la ejecucion del webworker")
    }
  }

  function stopWorker() {
    w.terminate();
    w = undefined;
  }

  return (
    <div className="App">
      {error && <p>{error}</p>}
      {/* <div>
        <Button color={colores.uno} className='mx-1' onClick={startWorker}>Start</Button>
        <Button color={colores.dos} className='mx-1' onClick={stopWorker}>Stop</Button>
      </div> */}

      <div>
        <Button color={colores[0]} className='mx-1'>Boton 1</Button>
        <Button color={colores[1]} className='mx-1'>Boton 2</Button>
        <Button color={colores[2]} className='mx-1'>Boton 3</Button>
      </div>
    </div>
  );
}

export default App;
