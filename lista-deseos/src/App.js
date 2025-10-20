import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import './App.css';

function Borrar({ deseo, quitarDeseo }) {
  return (
    <button onClick={() => quitarDeseo(deseo)}>Borrar {deseo}</button>
  )
}

class DesireList extends Component {
  render() {
    const { deseos, callback } = this.props;
    return (
      <ul>
        {
          deseos.map((d, i) => {
            return (
              <li key={i} className='mb-2'>
                {d}
                &nbsp;
                <Borrar deseo={d} quitarDeseo={callback} />
              </li>
            )
          })
        }
      </ul>
    );
  }
}

class Desire extends Component {
  render() {
    const { callback } = this.props;
    // No hay que pasar el evento al callback porque lo hace react automaticamente
    // cuando usamos onSubmit
    return (
      <form action="#" onSubmit={callback}>
        <input type='text' placeholder='Escribe tu deseo' name='deseo' />
      </form>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      deseos: []
    }
  }

  agregarDeseo = (event) => {
    // No usar el comportamiento por defecto
    event.preventDefault();

    // Obtener el valor y comprobar que no este vacio
    const valor = event.target.deseo.value.trim();
    if (!valor) return;

    const nuevoArr = [...this.state.deseos];
    nuevoArr.push(valor);
    this.setState({ deseos: nuevoArr });

    // Resetear el formulario 
    event.target.reset();
  }

  quitarDeseo = (valor) => {
    // Filtrar todos los deseos que no sean el que he borrado
    const nuevoArr = [...this.state.deseos].filter((item) => item !== valor);
    this.setState({ deseos: nuevoArr });
  }

  render() {
    return (
      <div className="App mt-5">
        <h2>Lista de deseos</h2>
        <h5>Añade tus regalos favoritos</h5>
        <DesireList deseos={this.state.deseos} callback={this.quitarDeseo} />
        <Desire callback={this.agregarDeseo} />
      </div>
    );
  }
}

export default App;
