import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  state = {
    saludo: "Este es un saludo en Español",
  };

  mesajeIngles = () => {
    this.setState({ saludo: "This is something in English" });
  };

  segundoMensajeIngles = () => {
    this.setState({ saludo: "This is the second message in English" });
  };

  mensajeAleman = () => {
    this.setState({ saludo: "Das ist eine Nachricht auf Deutsch" });
  };

  mensajeSueco = () => {
    this.setState({ saludo: "Detta är ett meddelande på svenska" });
  };

  mensajeEspanol = () => {
    this.setState({ saludo: "Este es un saludo en Español" });
  };

  render() {
    return (
      <div className="App mt-4">
        <h2>{this.state.saludo}</h2>
        <button className="btn btn-primary me-2" onClick={this.mesajeIngles}>
          Inglés
        </button>
        <button className="btn btn-secondary me-2" onClick={this.segundoMensajeIngles}>
          Inglés II
        </button>
        <button className="btn btn-success me-2" onClick={this.mensajeAleman}>
          Alemán
        </button>
        <button className="btn btn-warning me-2" onClick={this.mensajeSueco}>
          Sueco
        </button>
        <button className="btn btn-danger" onClick={this.mensajeEspanol}>
          Español
        </button>
      </div>
    );
  }
}

export default App;

