import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Card, Breadcrumb, BreadcrumbItem, ButtonGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE = "http://localhost:4000"

function App() {

  const [enlaces, setEnlaces] = useState(null)
  const [showAlta, setShowAlta] = useState(false)
  const [showDesactivar, setShowDesactivar] = useState(false)
  const [nuevoAlta, setNuevoAlta] = useState({
    nombre: "",
    url: "",
  })

  const toggleAlta = () => {
    setShowAlta(!showAlta)
  }

  const toggleDesactivar = () => {
    setShowDesactivar(!showDesactivar)
  }

  const handleStoreChange = (event) => {

    const key = event.target.name
    const value = event.target.value

    setNuevoAlta(prev => ({
      ...prev,
      [key]: value,
    }))

  }

  const handleStoreSubmit = (event) => {
    event.preventDefault()

    const lastId = enlaces[enlaces.length - 1].id + 1 ?? 1

    setEnlaces(prev => ([
      ...prev, {
        id: lastId,
        ...nuevoAlta,
      }]
    ))

  }

  const handleDesactivarSubmit = (event) => {
    event.preventDefault()

    console.log("desactivar")
  }

  useEffect(() => {

    const fetchEnlaces = () => {

      axios.get(`${BASE}/enlaces.php`)
        .then((res) => {
          setEnlaces(res.data)
        })

    }

    fetchEnlaces()

  }, [])

  const listaEnlaces = enlaces && enlaces.length > 0
    ? enlaces?.map(enlace => (
      <BreadcrumbItem key={enlace.id}>
        <a href={enlace.url}>
          {enlace.nombre}
        </a>
      </BreadcrumbItem>
    ))
    : null

  return (
    <div className="App p-5">
      <Card className='d-flex gap-3 p-4'>

        <h1>Menú con Reactstrap Breadcrumbs</h1>

        <ButtonGroup className='d-flex gap-2 w-50'>
          <Button color='success' className='rounded' onClick={toggleAlta}>Alta</Button>
          <Button color='danger' className='rounded'>Desactivar</Button>
        </ButtonGroup>

        <Breadcrumb>
          {listaEnlaces}
        </Breadcrumb>
      </Card>



      <Modal isOpen={showAlta} toggle={toggleAlta}>

        <ModalHeader toggle={toggleAlta}>Alta de Breadcrumb</ModalHeader>

        <ModalBody>
          <FormGroup>
            <Label for="nombre">
              Nombre
            </Label>
            <Input
              id="nombre"
              name="nombre"
              placeholder="Ej. Google"
              type="text"
              onChange={handleStoreChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="url">
              URL
            </Label>
            <Input
              id="url"
              name="url"
              placeholder="https://google.com"
              type="text"
              onChange={handleStoreChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="secondary" onClick={toggleAlta}>
            Cancelar
          </Button>{' '}
          <Button color="primary" onClick={(e) => {
            handleStoreSubmit(e)
            toggleAlta()
          }}>
            Guardar
          </Button>
        </ModalFooter>

      </Modal>

      <Modal isOpen={showDesactivar} toggle={toggleDesactivar}>

        <ModalHeader toggle={toggleDesactivar}>Alta de Breadcrumb</ModalHeader>

        <ModalBody>
          <FormGroup>
            <Label for="nombre">
              Nombre
            </Label>
            <Input
              id="nombre"
              name="nombre"
              placeholder="Ej. Google"
              type="text"
              onChange={handleStoreChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="url">
              URL
            </Label>
            <Input
              id="url"
              name="url"
              placeholder="https://google.com"
              type="text"
              onChange={handleStoreChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="secondary" onClick={toggleDesactivar}>
            Cancelar
          </Button>{' '}
          <Button color="primary" onClick={(e) => {
            handleDesactivarSubmit(e)
            toggleDesactivar()
          }}>
            Guardar
          </Button>
        </ModalFooter>

      </Modal>

    </div >
  );
}

export default App;
