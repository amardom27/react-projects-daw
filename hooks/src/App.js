import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useEffect, useState } from 'react';
import { Button } from 'reactstrap';

function App() {
  const [contador, setContador] = useState(0);

  const handleClick = () => {
    setContador(contador + 1);
  }

  useEffect(() => {
    // Si ya está en 0, no crear más intervalos
    if (contador <= 0) return;

    const timer = setInterval(() => {
      setContador(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [contador]);

  useEffect(() => {
    document.title = contador;
  }, [contador]);

  return (
    <div className="App d-flex flex-column align-items-center mt-4">
      <h1>Teoría de hooks</h1>
      <h3>{contador}</h3>
      <Button onClick={handleClick}>Dale</Button>
    </div>
  );
}

export default App;
