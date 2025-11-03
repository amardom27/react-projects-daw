import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import { Button, Container, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import './App.css';


function MostarPueblos({ pueblos, seleccionado, handleClick }) {
  return (
    <>
      {pueblos.map((p, i) => {
        let color = "secondary";

        if (p.visitado) {
          color = "success";
        }

        if (p.nombre === seleccionado) {
          color = "primary";
        }

        return (
          <Button key={i} color={color} onClick={() => handleClick(p.nombre)}>{p.nombre}</Button>
        )
      })}
    </>
  )
}

function DetallePueblo({ pueblo }) {
  return (
    <div className='mt-4'>
      <h2>Detalle Pueblo</h2>
      <p><strong>Poblacion: </strong>{pueblo.poblacion} personas.</p>
      <p><strong>Superficie: </strong>{pueblo.superficie_km2} km2.</p>
    </div>
  )
}

function FormAgregarPueblo({ callback }) {
  return (
    <Container fluid className="mt-4">
      <h2>Agregar un nuevo pueblo</h2>
      <Form onSubmit={(event) => callback(event)}>
        <FormGroup>
          <Label for="nombre">Nombre del Pueblo:</Label>
          <Input
            id="nombre"
            name="nombre"
            placeholder="Ej: Gaucín"
            type="text"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="poblacion">Población:</Label>
          <Input
            id="poblacion"
            name="poblacion"
            placeholder="Ej: 1800"
            type="number"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="superficie">Superficie (km2):</Label>
          <Input
            id="superficie"
            name="superficie"
            placeholder="Ej: 30.5"
            type="number"
            step="0.01"
            required
          />
        </FormGroup>

        <Button color="primary" type="submit">
          Agregar Pueblo
        </Button>
      </Form>
    </Container>
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pueblos: [
        { nombre: "Málaga", poblacion: 591637, superficie_km2: 398.25, visitado: false },
        { nombre: "Marbella", poblacion: 159874, superficie_km2: 116.3, visitado: false },
        { nombre: "Benalmádena", poblacion: 73160, superficie_km2: 26.87, visitado: false },
        { nombre: "Mijas", poblacion: 91977, superficie_km2: 148.7, visitado: false },
        { nombre: "Fuengirola", poblacion: 86305, superficie_km2: 24.7, visitado: false },
      ],
      detalle: null,
      mensajeAlerta: "",
    }
  }

  /**
   * 
   * @param {string} nombre 
   */
  seleccionarPueblo = (nombre) => {
    const nuevoArr = [...this.state.pueblos];

    nuevoArr.find((p) => p.nombre === nombre).visitado = true;

    this.setState({
      pueblos: nuevoArr,
      detalle: nombre,
    });
  }

  /**
   * 
   * @param {React.FormEvent<HTMLFormElement>} event 
   */
  agregarPueblo = (event) => {
    event.preventDefault();

    const nombre = event.target.nombre.value.trim();
    const poblacion = event.target.poblacion.value.trim();
    const superficie = event.target.superficie.value.trim();

    // Comprobar que no esten vacios
    if (!nombre || !poblacion || !superficie) {
      this.setState({ mensajeAlerta: "NO puede haber campos vacíos." });
      return;
    }

    // Que no esten repetidos
    if (this.state.pueblos.find((p) => p.nombre === nombre) !== undefined) {
      this.setState({ mensajeAlerta: "NO puede haber nombres repetidos." });
      return;
    }

    const poblacionInt = parseInt(poblacion);
    const superficieInt = parseFloat(superficie);

    // Que no sean negativos
    if (poblacionInt < 0 || superficieInt < 0) {
      this.setState({ mensajeAlerta: "NO puede haber valores negativos." });
      return;
    }

    const nuevoObj = { nombre, poblacion: poblacionInt, superficie_km2: superficieInt, visitado: false };

    this.setState((prev) => ({
      pueblos: [...prev.pueblos, nuevoObj],
      mensajeAlerta: ""
    }));

    event.target.reset();
  }

  render() {
    const pueblo = this.state.pueblos.find((p) => p.nombre === this.state.detalle);

    return (
      <div className="App">
        <h1>Lista de pueblos</h1>
        <MostarPueblos pueblos={this.state.pueblos} seleccionado={this.state.detalle} handleClick={this.seleccionarPueblo} />
        {this.state.detalle &&
          <DetallePueblo pueblo={pueblo} />
        }
        <FormAgregarPueblo callback={this.agregarPueblo} />
        {this.state.mensajeAlerta !== "" &&
          <Alert color="danger" className='my-4 mx-2'>
            {this.state.mensajeAlerta}
          </Alert>
        }
      </div >
    );
  }
}

export default App;
