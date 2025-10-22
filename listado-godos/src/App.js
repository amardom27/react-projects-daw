import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Component } from 'react';
import ListadoGodos from './components/ListadoGodos';
import FormGodo from './components/FormGodo';

class App extends Component {
  constructor() {
    super();
    this.state = {
      godos: [
        {
          id: 1,
          imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/02-ALARICO.JPG/120px-02-ALARICO.JPG",
          nombre: "Alarico",
          descripcion: "Fue el primer rey visigodo que saqueó Roma en el año 410, marcando un hito en la caída del Imperio Romano."
        },
        {
          id: 2,
          imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Ata%C3%BAlfo.jpg/120px-Ata%C3%BAlfo.jpg",
          nombre: "Ataúlfo",
          descripcion: "Rey visigodo conocido por establecerse en la Península Ibérica y buscar la integración con el Imperio Romano."
        },
        {
          id: 3,
          imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Sigerico%2C_rey_de_los_Visigodos_%28Museo_del_Prado%29.jpg/120px-Sigerico%2C_rey_de_los_Visigodos_%28Museo_del_Prado%29.jpg",
          nombre: "Sigerico",
          descripcion: "Rey visigodo que tuvo un reinado breve y polémico, conocido por su gobierno tiránico en el año 415."
        },
      ],
      newImage: null
    }
  }

  /**
   * 
   * @param {React.FormEvent<HTMLFormElement>} event 
   */
  agregarGodo = (event) => {
    event.preventDefault();

    console.log(event);

    const nombre = event.target.nombre.value.trim();
    const imgSrc = event.target.imagen.value.trim();
    const descripcion = event.target.descripcion.value.trim();

    if (!nombre || !imgSrc || !descripcion) {
      return;
    }

    const lastId = this.state.godos.length > 0 ? this.state.godos[this.state.godos.length - 1].id : 0;
    const nuevoObj = { id: lastId + 1, nombre, imgSrc, descripcion };

    this.setState((prev) => ({
      godos: [...prev.godos, nuevoObj]
    }))

    event.target.reset();
  }

  borrarGodo = (id) => {
    const nuevoArr = this.state.godos.filter((g) => g.id !== id);
    this.setState({ godos: nuevoArr });
  }

  // TODO: Hacer que se pueda subir una imagen

  render() {
    return (
      <div className="App pt-3 pb-4">
        <h1 className="text-center mb-4">Listado de godos</h1>
        <ListadoGodos godos={this.state.godos} callback={this.borrarGodo} />
        <FormGodo callback={this.agregarGodo} />
      </div>
    );
  }
}

export default App;
