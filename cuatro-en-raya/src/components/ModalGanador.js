import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function ModalGanador({ modalAbierto, ganador, onReset }) {
	let text = "Hagando el jugador AZUL";
	let color = "bg-info";

	if (ganador === "danger") {
		text = "Ha ganado el jugador ROJO";
		color = "bg-danger";
	} else if (ganador === "Empate") {
		text = "Ha habido un empate";
		color = "bg-secondary";
	}

	return (
		<div>
			<Modal isOpen={modalAbierto} toggle={onReset}>
				<ModalHeader toggle={onReset}>Resultado</ModalHeader>
				<ModalBody>
					{text}
					{' '}
					<span className={`rounded-circle ${color}`}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={onReset}>
						Resetear
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	)
}

export default ModalGanador;