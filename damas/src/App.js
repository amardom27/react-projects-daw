import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Button } from 'reactstrap';
import { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      estaJugando: false,
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
    }
  }

  toggleJugando = () => {
    this.setState((prev) => ({ estaJugando: !prev.estaJugando }));
  }

  mostrarMatriz = () => {

  }

  render() {
    return (
      <div className="App" >
        {!this.state.estaJugando && (
          <Button onClick={this.toggleJugando}>Jugar</Button>
        )}

        {this.state.estaJugando &&
          this.state.matriz.map((fila, i) => (
            <div key={i}>
              {fila.map((celda, j) => {
                const outline = celda === 0 ? 'outline' : '';
                const verde = celda === 2 ? 'success' : 'secondary';
                return (
                  <Button key={j} outline={outline} color={verde}></Button>
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
