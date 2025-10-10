import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import { Button } from 'reactstrap';
import './App.css';

const BOTONES = [
  {
    texto: "UNO",
  },
  {
    texto: "DOS",
  },
  {
    texto: "TRES",
  },
]

class App extends Component {
  constructor() {
    super();
    this.state = {
      contador: 0,
    }
  }

  cambiarContador(num) {
    this.setState({ contador: num });
  }

  render() {
    return (
      <div className="App min-vh-100 d-flex justify-content-center align-items-center">
        {BOTONES.map((b, index) => <Butonaco key={index} texto={b.texto} callback={() => this.cambiarContador(index)} color={this.state.contador === index ? "primary" : "secondary"} />)}
      </div >
    );

  }
}

function Butonaco({ color, texto, callback }) {
  return (
    <Button className='mx-2' color={color} onClick={callback}>{texto}</Button>
  )
}

export default App;
