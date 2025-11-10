import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import './App.css';
import MapaBotones from './components/MapaBotones';
import ModalGanador from './components/ModalGanador';

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

  comprobarGanadorFilas = (matriz, colorTurno, i, j) => {
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

  comprobarGanadorFilasEficiente = (matriz, colorTurno, i, j) => {
    // Posicion para empezar y terminar (3 antes y 3 despues de la posicion que hemos puesto)
    const left = Math.max(0, j - 3);
    const right = Math.min(matriz[i].length - 1, j + 3);


    // Contador de fichas consecutivas del mismo color
    let cont = 0;
    for (let k = left; k <= right; k++) {
      const celda = matriz[i][k];

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

    // No se ha encontrado ganador
    return undefined;
  }

  comprobarGanadorColumnasEficiente = (matriz, colorTurno, i, j) => {
    // Posicion para empezar y terminar (3 arriba y 3 debajo de la posicion que hemos puesto)
    const top = Math.max(0, i - 3);
    const bottom = Math.min(matriz[i].length - 1, i + 3);

    // Contador de fichas consecutivas del mismo color
    let cont = 0;
    for (let k = top; k <= bottom; k++) {
      const celda = matriz[k][j];

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

    // No se ha encontrado ganador
    return undefined;
  }

  comprobarGanadorDiagonalEficiente = (matriz, colorTurno, i, j) => {
    // Máximo desplazamiento hacia arriba-izquierda
    const offsetUpLeft = Math.min(3, i, j);

    // Máximo desplazamiento hacia abajo-derecha
    const offsetDownRight = Math.min(3, matriz.length - 1 - i, matriz[i].length - 1 - j);

    const startI = i - offsetUpLeft;
    const startJ = j - offsetUpLeft;

    const endI = i + offsetDownRight;
    const endJ = j + offsetDownRight;

    console.log(startI);
    console.log(startJ);

    console.log();

    console.log(endI);
    console.log(endJ);

    let cont = 0;
    for (let kI = startI, kJ = startJ; kI <= endI && kJ <= endJ; kI++, kJ++) {
      const celda = matriz[kI][kJ];

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

    // No se ha encontrado ganador
    return undefined;
  }

  comprobarFin = (matriz) => {
    for (let i = 0; i < matriz.length; i++) {
      for (let j = 0; j < matriz[i].length; j++) {
        if (matriz[i][j] === "secondary") {
          return false;
        }
      }
    }
    return true;
  }

  insertarFicha = (i, j) => {
    // Solo se permite pulsar el la primera línea
    if (i !== 0 || this.state.ganador) {
      return;
    }

    // Si esta rellena la primera fila, no hacemos nada por que no se pueden meter mas fichas
    if (this.state.matriz[i][j] !== "secondary") {
      return;
    }

    const nuevaMatriz = this.state.matriz.map(fila => [...fila]);

    let color = this.state.turno === JUGADORES.AZUL ? "info" : "danger";
    let nuevaPosI, nuevaPosJ;

    // K es para recorrer desde la posicion mas abajo hasta la de mas arriba
    for (let k = nuevaMatriz.length - 1; k >= 0; k--) {
      if (nuevaMatriz[k][j] === "secondary") {
        color = this.state.turno === JUGADORES.AZUL ? "info" : "danger";
        nuevaMatriz[k][j] = color;

        nuevaPosI = k;
        nuevaPosJ = j;

        break;
      }
    }

    let nuevoGanador = this.comprobarGanadorFilasEficiente(nuevaMatriz, color, nuevaPosI, nuevaPosJ);

    if (!nuevoGanador) {
      nuevoGanador = this.comprobarGanadorColumnasEficiente(nuevaMatriz, color, nuevaPosI, nuevaPosJ);
    }

    if (!nuevoGanador) {
      nuevoGanador = this.comprobarGanadorDiagonalEficiente(nuevaMatriz, color, nuevaPosI, nuevaPosJ);
    }

    if (!nuevoGanador && this.comprobarFin(nuevaMatriz)) {
      nuevoGanador = "Empate";
    }

    this.setState({
      matriz: nuevaMatriz,
      ganador: nuevoGanador,
      turno: nuevoGanador ? this.state.turno : (this.state.turno === JUGADORES.AZUL ? JUGADORES.ROJO : JUGADORES.AZUL)
    });
  }

  resetearJuego = () => {
    this.setState({
      turno: JUGADORES.AZUL,
      matriz: crearMatrizInicial(),
      ganador: undefined,
    })
  }

  render() {
    const { ganador } = this.state;
    const modalAbierto = ganador !== undefined;
    const colorTurno = this.state.turno;

    return (
      <div className="App d-flex flex-column align-items-center p-5 gap-2">
        <h1>Juego 4 en ralla</h1>
        <h3>
          Turno: {colorTurno}
          {' '}
          <span className={`rounded-circle ${colorTurno === JUGADORES.AZUL ? 'bg-info' : 'bg-danger'}`}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </h3>
        <MapaBotones matriz={this.state.matriz} onInsert={this.insertarFicha} />
        <ModalGanador modalAbierto={modalAbierto} ganador={ganador} onReset={this.resetearJuego} />
      </div>
    );
  }
}

export default App;
