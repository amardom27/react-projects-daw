import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import './App.css';

const Atlas = (props) => {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleClick = () => {
    props.callback(nombre, apellidos, telefono);

    setNombre("");
    setApellidos("");
    setTelefono("");
  }

  return (
    <Form>
      <FormGroup>
        <Label for="nombre">Nombre:</Label>
        <Input className='mb-2' name='nombre' id='nombre' placeholder='Introduzca nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <Label for="apellidos">Apellidos:</Label>
        <Input className='mb-2' name='apellidos' id='apellidos' placeholder='Introduzca apellidos' value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
        <Label for="telefono">Telefono:</Label>
        <Input className='mb-2' name='telefono' id='telefono' placeholder='Introduzca telefono' value={telefono} onChange={(e) => setTelefono(e.target.value)} />
      </FormGroup>
      <Button onClick={handleClick}>Añadir</Button>
    </Form>
  );
}

const Mostrar = (props) => {
  return (
    <ul>
      {
        props.personas.map((p, i) => (
          <li key={i} className='mb-2'>
            {p.nombre}{' '}{p.apellidos}{' '}{p.telefono}{' '}
            <Button onClick={() => props.callback(p.id)}>X</Button>
          </li>
        ))
      }
    </ul>
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personas: []
    }
  }

  agregarPersona = (nombre, apellidos, telefono) => {
    const nuevoNombre = nombre.trim();
    const nuevoApellidos = apellidos.trim();
    const nuevoTelefono = telefono.trim();

    // No agregar persona si hay un campo vacio
    if (nuevoNombre === "" || nuevoApellidos === "" || nuevoTelefono === "") {
      return;
    }

    // Sumamos uno al ultimo id
    const lastId = this.state.personas.length > 0 ? this.state.personas[this.state.personas.length - 1].id + 1 : 1;
    const nuevaPersona = { id: lastId, nombre: nuevoNombre, apellidos: nuevoApellidos, telefono: nuevoTelefono };

    this.setState((prevState) => ({
      personas: [...prevState.personas, nuevaPersona],
    }))
  }

  borrarPersona = (id) => {
    const nuevasPersonas = this.state.personas.filter(p => p.id !== id);

    this.setState({
      personas: nuevasPersonas,
    })
  }

  render() {
    return (
      <div className="App p-2 pt-4">
        <Mostrar personas={this.state.personas} callback={this.borrarPersona} />
        <Atlas callback={this.agregarPersona} />
      </div>
    );
  }
}

export default App;
