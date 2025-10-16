import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import logo from './logo.svg';
import { Button } from 'reactstrap';
import { Component } from 'react';

const Estado = Object.freeze({
  ULTIMO: 'ULTIMO',
  PENULTIMO: 'PENULTIMO',
  NADA: 'NADA'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      botones: [0, 0, 0, 0, 0],
      ultimo: 0,
      penultimo: undefined,
    }
  }

  cambiarEstados = (pos) => {
    const antiguoUltimo = this.state.ultimo;
    this.setState({
      ultimo: pos,
      penultimo: antiguoUltimo,
    })
  }

  render() {
    return (
      <div className="App d-flex min-vh-100 align-items-center justify-content-center gap-2">
        {this.state.botones.map((b, i) => {
          let value = Estado.NADA;
          if (i === this.state.ultimo) {
            value = Estado.ULTIMO;
          } else if (i === this.state.penultimo) {
            value = Estado.PENULTIMO;
          }

          return (
            <Button key={i} onClick={() => this.cambiarEstados(i)} color={value === Estado.PENULTIMO ? 'primary' : 'secondary'} style={{ width: '200px' }}>{value}</Button>
          )
        })
        }
      </div >
    );
  }
}

export default App;
