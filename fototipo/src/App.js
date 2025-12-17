import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { PREGUNTAS, TIPO_PIEL } from './constantes';
import { FormGroup, Button } from 'reactstrap';
import { useState } from 'react';

function Pregunta({ texto, respuestas, actulizarContador }) {
	const [isHidden, setIsHidden] = useState(false);

	const handleClick = (num) => {
		setIsHidden(true);
		actulizarContador(num);
	}

	return (
		<div className={`bg-warning bg-opacity-25 p-3 mb-4 ${isHidden ? "d-none" : ""}`}>
			<h3>{texto}</h3>
			<hr />
			<FormGroup>
				{respuestas.map((r, i) => <Button key={i} color='danger' outline onClick={() => handleClick(r.valor)}>{r.respuesta}</Button>)}
			</FormGroup>
		</div>
	);
}

function ResultadoFototipo({ fototipo }) {
	let tipo;

	if (fototipo >= 0 && fototipo <= 7) {
		tipo = 0;
	} else if (fototipo >= 8 && fototipo <= 21) {
		tipo = 1;
	} else if (fototipo >= 22 && fototipo <= 42) {
		tipo = 2;
	} else if (fototipo >= 43 && fototipo <= 68) {
		tipo = 3;
	} else if (fototipo >= 69 && fototipo <= 84) {
		tipo = 4;
	} else if (fototipo >= 85) {
		tipo = 5;
	}

	return (
		<div className='bg-success text-success text-success-emphasis bg-opacity-25 p-3 mb-4'>
			<h3>Usted tiene fototipo {tipo}</h3>
			<p>Su puntuación en el test ha sido {fototipo}</p>
			<hr />
			<p>{TIPO_PIEL[tipo]}</p>
		</div>
	);
}

function App() {
	const [contador, setContador] = useState(0);
	const [fototipo, setFototipo] = useState(0);

	const actulizarContador = (valor) => {
		setContador(prev => prev + 1);
		setFototipo(prev => prev + valor);
	}

	return (
		<div className="App">
			<header className='bg-warning p-3 d-flex align-items-center gap-4'>
				<img src="soludable.png" alt="logo soludable" width={'100px'} />
				<span className='d-inline-block fs-1 text-uppercase text-white'>Averigua tu fototipo</span>
			</header>
			<div className='mt-3'>
				{PREGUNTAS.map((p, i) => <Pregunta key={i} texto={p.texto} respuestas={p.respuestas} actulizarContador={actulizarContador} />)}
			</div>
			{contador === PREGUNTAS.length && <ResultadoFototipo fototipo={fototipo} />}
		</div >
	);
}

export default App;
