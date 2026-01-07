import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Component, useState } from 'react';

const Rey = (props) => {
  const { className } = props;

  const [rey, setRey] = useState("");
  const [tropas, setTropas] = useState(0);

  const handleChange = (event) => {
    if (event.target.name === "rey") {
      setRey(event.target.value);
    } else if (event.target.name === "tropas") {
      setTropas(event.target.value);
    }
  }

  const handleSubmit = () => {
    props.agregar(rey, tropas);
    props.toggle();
  }

  return (
    <div>
      <Modal isOpen={props.mostrar} toggle={props.toggle} className={className} onEnter={() => { }}>
        <ModalHeader toggle={props.toggle}>AÑADIR REY Y TROPAS</ModalHeader>
        <ModalBody>
          <FormGroup row>
            <Label sm={2}>Nombre Rey: </Label>
            <Col sm={10}>
              <Input onChange={handleChange} id='rey' name='rey' type='Text' />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>Tropas: </Label>
            <Col sm={10}>
              <Input onChange={handleChange} id='tropas' name='tropas' type='Number' default="0" />
            </Col>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={handleSubmit}>AÑADIR REY</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

const Mostrar = (props) => {
  return (
    <>
      {props.reyes.map(r => <Button key={r.id} onClick={() => props.cambiar(r.id)}>{r.nombre} - {r.tropas}</Button>)}
    </>
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      reyes: [
        {
          id: 1,
          nombre: "Fulanito",
          tropas: "1000",
          bando: "godos",
        },
        {
          id: 2,
          nombre: "Menganito",
          tropas: "3000",
          bando: "godos",
        },
        {
          id: 3,
          nombre: "Pepe",
          tropas: "3000",
          bando: "normandos",
        }
      ]
    }
  }

  toggleModal() { this.setState({ isOpen: !this.state.isOpen }) }

  cambiarBando = (id) => {
    const nuevosReyes = [...this.state.reyes].map(r => {
      if (r.id === id) {
        const nuevoBando = r.bando === "godos" ? "normandos" : "godos";

        return { ...r, bando: nuevoBando }
      }
      return { ...r }
    });
    this.setState({ reyes: nuevosReyes });
  }

  agregarRey = (nombre, tropas) => {
    if (nombre === "" || tropas === "") {
      return;
    }

    if (Number(tropas) < 0) {
      return;
    }

    // Que el nombre no este repetido
    if (this.state.reyes.find(r => r.nombre.toUpperCase() === nombre.toUpperCase()) !== undefined) {
      return;
    }

    const lastId = this.state.reyes.length > 0 ? (this.state.reyes[this.state.reyes.length - 1].id + 1) : 1;
    const nuevoRey = { id: lastId, nombre: nombre.toUpperCase(), tropas, bando: "godos" };

    const nuevosReyes = [...this.state.reyes, nuevoRey];
    this.setState({ reyes: nuevosReyes });
  }

  render() {
    const godos = this.state.reyes.filter(r => r.bando === "godos");
    const normandos = this.state.reyes.filter(r => r.bando === "normandos");

    let totalGodos = 0;
    this.state.reyes.forEach(r => {
      if (r.bando === "godos") {
        totalGodos += Number(r.tropas);
      }
    });

    let totalNormandos = 0;
    this.state.reyes.forEach(r => {
      if (r.bando === "normandos") {
        totalNormandos += Number(r.tropas);
      }
    });

    return (
      <div className="App" >
        <h1>Godos - {totalGodos}</h1>
        <Mostrar reyes={godos} cambiar={this.cambiarBando} />
        <h1>Normandos - {totalNormandos}</h1>
        <Mostrar reyes={normandos} cambiar={this.cambiarBando} />
        <br />
        <Button onClick={() => this.toggleModal()} color='info'>ALTA REY GODO</Button>
        <Rey mostrar={this.state.isOpen} toggle={() => this.toggleModal()} agregar={this.agregarRey} />
      </div>
    );
  }
}

export default App;