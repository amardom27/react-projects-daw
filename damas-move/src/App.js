import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Button } from 'reactstrap';
import { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      matriz: [
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [2, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 0, 2, 0, 2, 0, 2],
        [2, 0, 2, 0, 2, 0, 2, 0]
      ],
      seleccionado: false,
    }
  }

  comprobarValidezCambio = (oldPosI, oldPosJ, newPosI, newPosJ) => {
    // Mover hacia arriba solo
    if (newPosI !== oldPosI - 1) {
      return false;
    }
    // Mover diagonalmente solo (izquierda o derecha)
    if (newPosJ !== oldPosJ + 1 && newPosJ !== oldPosJ - 1) {
      return false;
    }
    return true;
  }

  handleClick = (i, j) => {
    if (this.state.seleccionado) {
      // Si la posicion elegida es la misma, quitamos la seleccion (volver a verde)
      if (this.state.seleccionado.i === i && this.state.seleccionado.j === j) {
        const nuevaMatriz = JSON.parse(JSON.stringify(this.state.matriz));
        nuevaMatriz[i][j] = 2;

        this.setState({
          matriz: nuevaMatriz,
          seleccionado: false,
        })
      }
      if (this.state.matriz[i][j] === 1) {
        if (!this.comprobarValidezCambio(this.state.seleccionado.i, this.state.seleccionado.j, i, j)) {
          return;
        }
        const nuevaMatriz = JSON.parse(JSON.stringify(this.state.matriz));

        nuevaMatriz[this.state.seleccionado.i][this.state.seleccionado.j] = 1;
        nuevaMatriz[i][j] = 2;

        this.setState({
          matriz: nuevaMatriz,
          seleccionado: false,
        })
      }
    } else {
      // Solo se pueden seleccionar los verdes
      if (this.state.matriz[i][j] !== 2) {
        return;
      }
      const nuevaMatriz = JSON.parse(JSON.stringify(this.state.matriz));
      nuevaMatriz[i][j] = 3;
      const pos = { i, j };
      this.setState({
        matriz: nuevaMatriz,
        seleccionado: pos,
      })
    }
  }

  render() {
    return (
      <div className="App" >
        {this.state.matriz.map((fila, i) => (
          <div key={i}>
            {fila.map((celda, j) => {
              const outline = celda === 0 ? 'outline' : '';
              let color = "secondary";
              if (celda === 2) {
                color = "success";
              }
              if (celda === 3) {
                color = "primary";
              }

              return (
                <Button className='' key={j} outline={outline} color={color} onClick={() => this.handleClick(i, j)}></Button>
              )
            })}
          </div>
        ))
        }
      </div>
    );
  }
}

export default App;
