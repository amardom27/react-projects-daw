import { Button } from "reactstrap";

function MapaBotones({ matriz, onInsert }) {
	return (
		<div>
			{
				matriz.map((fila, i) => (
					<div key={i}>
						{fila.map((color, j) => (
							<Button key={j} color={color} className='rounded-circle' onClick={() => onInsert(i, j)}>&nbsp;{i}&nbsp;&nbsp;{j}&nbsp;</Button>
						))}
					</div>
				))
			}
		</div>
	)
}

export default MapaBotones;