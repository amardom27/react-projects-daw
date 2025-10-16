import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import logo from './logo.svg';
import { Button } from 'reactstrap';
import { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      botones: [0, 0, 0, 0, 0],
      mayor: 0,
    }
  }

  actulizarContador = (pos) => {
    const nuevoArr = [...this.state.botones];
    nuevoArr[pos] += 1;

    const nuevoValor = nuevoArr[pos];

    this.setState({
      botones: nuevoArr,
      mayor: nuevoValor > this.state.mayor ? nuevoValor : this.state.mayor
    });
  }

  disminuirContadores = () => {
    const nuevosBotones = this.state.botones.map(b => (b > 0 ? b - 1 : 0));

    const nuevoMayor = Math.max(...nuevosBotones);

    this.setState({
      botones: nuevosBotones,
      mayor: nuevoMayor
    });
  }

  // Como un useEffect
  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.disminuirContadores();
    }, 2000); // cada 2000 ms (2 segundos)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <div className="App min-vh-100 d-flex gap-2 align-items-center justify-content-center">
        {this.state.botones.map((b, i) => (
          <Button
            key={i}
            onClick={() => this.actulizarContador(i)}
            color={b === this.state.mayor ? 'primary' : 'secondary'}
          >
            {b}
          </Button>
        ))}
      </div>
    );
  }
}

export default App;
