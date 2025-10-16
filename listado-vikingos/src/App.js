import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import logo from './logo.svg';
import { Component } from 'react';
import { Button } from 'reactstrap';

const reyesGodos = [
  "Alarico",
  "Ataúlfo",
  "Sigerico",
  "Walia",
  "Teodoredo",
  "Eurico",
  "Alarico",
  "Gesaleico",
  "Leovigildo",
  "Recaredo"
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      reyActivo: 0,
    }
  }

  cambiarHaciaDelante = () => {
    const nuevaPos = this.state.reyActivo + 1 >= reyesGodos.length
      ? reyesGodos.length - 1
      : this.state.reyActivo + 1;
    this.setState({ reyActivo: nuevaPos });
  }

  cambiarHaciaDetras = () => {
    const nuevaPos = this.state.reyActivo - 1 < 0
      ? 0
      : this.state.reyActivo - 1;
    this.setState({ reyActivo: nuevaPos });
  }

  cambiarHaciaDelante = () => {
    const nuevaPos = (this.state.reyActivo + 1) % reyesGodos.length;
    this.setState({ reyActivo: nuevaPos });
  }

  cambiarHaciaDetras = () => {
    const nuevaPos = (this.state.reyActivo - 1 + reyesGodos.length) % reyesGodos.length;
    this.setState({ reyActivo: nuevaPos });
  }

  render() {
    console.log(this.state.reyActivo);

    return (
      <div className="App min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <h1>{reyesGodos[this.state.reyActivo]}</h1>
        <div className='d-flex gap-4'>
          <Button onClick={this.cambiarHaciaDetras}>Anterior</Button>
          <Button onClick={this.cambiarHaciaDelante}>Posterior</Button>
        </div>
      </div>
    )
  }
}

export default App;
