import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import { Button } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colores: ["primary", "success", "danger", "warning", "info"],
    }
  }

  cambiarColores = () => {
    const nuevoArr = [...this.state.colores.splice(1), this.state.colores[0]];
    this.setState({ colores: nuevoArr });
  }

  render() {
    return (
      <div className="App">
        <h4>Juego de colores</h4>
        <div>
          <Button color={this.state.colores[0]}>1</Button>
          <Button color={this.state.colores[1]}>2</Button>
          <Button color={this.state.colores[2]}>3</Button>
          <Button color={this.state.colores[3]}>4</Button>
          <Button color={this.state.colores[4]}>5</Button>
        </div>
        <Button color='dark' onClick={this.cambiarColores}>Reiniciar colores</Button>
      </div>
    );
  }
}

export default App;
