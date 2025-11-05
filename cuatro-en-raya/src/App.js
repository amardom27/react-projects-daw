import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Component } from 'react';
import { Button } from 'reactstrap';

const SIZE = 9;
const WORD = "secondary";
const JUGADORES = Object.freeze({
  AZUL: "Azul",
  ROJO: "Rojo",
});
const FICHAS = 4;

const crearMatrizInicial = () => Array.from({ length: SIZE }, () => Array(SIZE).fill(WORD));

class App extends Component {
  constructor() {
    super();
    this.state = {
      turno: JUGADORES.AZUL,
      matriz: crearMatrizInicial(),
      ganador: undefined,
    }
  }

  comprobarGanadorFilas = (matriz, colorTurno) => {
    // Recorremos todas las filas
    for (let i = matriz.length - 1; i >= 0; i--) {
      // Contador de fichas consecutivas del mismo color
      let cont = 0;

      for (let j = 0; j < matriz[i].length; j++) {
        const celda = matriz[i][j];

        // Si no es el color del turno saltamos a la siguiente iteracion
        if (celda !== colorTurno) {
          cont = 0;
          continue;
        }

        // Si es del mismo color, aumentamos el contador
        cont++;

        // Si llegamos a 4 fichas iguales consecutivas
        if (cont >= FICHAS) {
          return colorTurno;
        }
      }
    }

    // No se ha encontrado ganador
    return undefined;
  }

  comprobarGanadorColumnas = (matriz, colorTurno) => {
    // Recorremos todas las columnas
    for (let j = 0; j < matriz[0].length; j++) {
      // Contador de fichas consecutivas del mismo color
      let cont = 0;

      for (let i = matriz.length - 1; i >= 0; i--) {
        const celda = matriz[i][j];

        // Si no es el color del turno saltamos a la siguiente iteración
        if (celda !== colorTurno) {
          cont = 0;
          continue;
        }

        // Si es del mismo color, aumentamos el contador
        cont++;

        // Si llegamos a 4 fichas iguales consecutivas
        if (cont >= FICHAS) {
          return colorTurno;
        }
      }
    }

    // No se ha encontrado ganador
    return undefined;
  }


  insertarFicha = (i, j) => {
    // Solo se permite pulsar el la primera línea
    if (i !== 0 || this.state.ganador) {
      return;
    }

    console.log(this.state.matriz[i][j]);

    // Si esta rellena la primera fila, no hacemos nada por que no se pueden meter mas fichas
    if (this.state.matriz[i][j] !== "secondary") {
      return;
    }

    const nuevaMatriz = this.state.matriz.map(fila => [...fila]);

    let color = this.state.turno === JUGADORES.AZUL ? "info" : "danger";
    // K es para recorrer desde la posicion mas abajo hasta la de mas arriba
    for (let k = nuevaMatriz.length - 1; k >= 0; k--) {
      if (nuevaMatriz[k][j] === "secondary") {
        color = this.state.turno === JUGADORES.AZUL ? "info" : "danger";
        nuevaMatriz[k][j] = color;

        break;
      }
    }
    let nuevoGanador = this.comprobarGanadorFilas(nuevaMatriz, color);

    if (!nuevoGanador) {
      nuevoGanador = this.comprobarGanadorColumnas(nuevaMatriz, color);
    }

    this.setState({
      matriz: nuevaMatriz,
      ganador: nuevoGanador,
      turno: nuevoGanador ? this.state.turno : (this.state.turno === JUGADORES.AZUL ? JUGADORES.ROJO : JUGADORES.AZUL)
    });
  }

  render() {
    return (
      <div className="App" >
        <h1>Juego 4 en ralla</h1>
        <h3>Turno: {this.state.turno}</h3>
        {
          this.state.matriz.map((fila, i) => (
            <div key={i}>
              {fila.map((color, j) => (
                <Button key={j} color={color} className='m-1' onClick={() => this.insertarFicha(i, j)}>{i} - {j}</Button>
              ))}
            </div>
          ))
        }
        {this.state.ganador !== undefined && <p>{this.state.ganador === "info" ? "Ha ganado el jugado azul" : "Ha ganado el jugador rojo"}</p>}
      </div>
    );
  }
}

export default App;
