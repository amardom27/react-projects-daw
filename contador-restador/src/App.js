import { Button } from 'reactstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      contador: 0,
    }
  }

  cambiarContador(num) {
    const nuevoContador = this.state.contador + num;
    this.setState({ contador: nuevoContador });
  }

  render() {
    return (
      <div className="App min-vh-100 d-flex flex-column justify-content-center align-items-center" >
        <h3>{this.state.contador}</h3>
        <div>
          <Button outline color='warning' onClick={() => this.cambiarContador(1)}>+1</Button>
          <Button outline color='info' onClick={() => this.cambiarContador(3)}>+3</Button>
          <Button outline color='danger' onClick={() => this.cambiarContador(5)}>+5</Button>
          <Button outline color='primary' onClick={() => this.cambiarContador(-5)}>-5</Button>
          <Button outline color='secondary' onClick={() => this.cambiarContador(-1)}>-1</Button>
        </div>
      </div>
    );

  }
}

export default App;
