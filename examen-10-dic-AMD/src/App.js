import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Component, useEffect, useState } from 'react';
import { Button, FormGroup, Label, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const ListaCorredores = ({ corredores, agregarCorredor, eliminarCorredor, modificarCorredor }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [posModificar, setPosModificar] = useState(null)
  const toggleModal = () => { setIsOpen(!isOpen) }

  const handleModify = (pos) => {
    toggleModal();
    setPosModificar(pos);
  }

  const handleToggle = () => {
    toggleModal()
    setTimeout(() => {
      setPosModificar(null)
    }, [200])
  }

  const nombreCorredor = corredores.find(c => c.posicion === posModificar)?.nombre ?? "";

  return (
    <>
      <ul>
        {
          corredores.map((c, i) => (
            <li key={i}>
              {c.posicion} --- {c.nombre}{' '}
              <Button color='warning' size='sm' onClick={() => handleModify(c.posicion)}>Modificar</Button>{' '}
              <Button color='danger' size='sm' onClick={() => eliminarCorredor(c.posicion)}>Baja</Button>
            </li>
          ))
        }
      </ul>
      <Button color='success' size='sm' onClick={() => toggleModal()}>Alta</Button>
      <ModalCorredor
        isOpen={isOpen}
        toggle={handleToggle}
        agregarCorredor={agregarCorredor}
        modificarCorredor={modificarCorredor}
        posModificar={posModificar}
        nombreCorredor={nombreCorredor}
      />
    </>
  )
}

const ModalCorredor = (props) => {
  const [nombre, setNombre] = useState("");

  const handleChange = (e) => {
    setNombre(e.target.value);
  }

  const handleSave = () => {
    if (props.posModificar) {
      props.modificarCorredor(props.posModificar, nombre);
    } else {
      props.agregarCorredor(nombre);
    }
    setNombre("");
    props.toggle();
  }

  useEffect(() => {
    setNombre(props.nombreCorredor);
  }, [props.nombreCorredor]);

  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>Corredor</ModalHeader>
      <ModalBody>
        {props.posModificar &&
          (
            <FormGroup>
              <Label>Posicion</Label>
              <Input value={props.posModificar} disabled />
            </FormGroup>
          )
        }
        <FormGroup>
          <Label>Nombre</Label>
          <Input name='nombre' value={nombre} onChange={handleChange} />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={handleSave}>Guardar</Button>
        <Button color='secondary' onClick={props.toggle}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  )
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      corredores: [
        {
          posicion: 1,
          nombre: "Fulanito"
        },
        {
          posicion: 2,
          nombre: "Menganito"
        }
      ]
    }
  }

  agregarCorredor = (nuevoNombre) => {
    const lastId = this.state.corredores.length > 0 ? this.state.corredores[this.state.corredores.length - 1].posicion + 1 : 1;
    const nuevosCorredores = [...this.state.corredores, { posicion: lastId, nombre: nuevoNombre }];

    this.setState({
      corredores: nuevosCorredores
    })
  }

  eliminarCorredor = (posicion) => {
    const nuevosCorredores = [...this.state.corredores].filter(c => c.posicion !== posicion);

    this.setState({
      corredores: nuevosCorredores
    })
  }

  modificarCorredor = (posicion, nuevoNombre) => {
    const nuevosCorredores = [...this.state.corredores].map(c => {
      if (c.posicion === posicion) {
        return { posicion, nombre: nuevoNombre }
      }
      return c
    })
    this.setState({
      corredores: nuevosCorredores
    })
  }

  render() {
    return (
      <div>
        <h2>Carrera de Istan</h2>
        <ListaCorredores
          corredores={this.state.corredores}
          agregarCorredor={this.agregarCorredor}
          eliminarCorredor={this.eliminarCorredor}
          modificarCorredor={this.modificarCorredor}
        />
      </div>
    )
  }
}

export default App;
