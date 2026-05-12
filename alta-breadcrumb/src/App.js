import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import { Breadcrumb, BreadcrumbItem, Button, ButtonGroup, Card, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap'
import './App.css'

const BASE_URL = 'http://localhost:4000'

function App() {

  // STATES
  const [enlaces, setEnlaces] = useState([])
  const [modalAlta, setModalAlta] = useState(false)
  const [modalDesactivar, setModalDesactivar] = useState(false)
  const [modalCanvas, setModalCanvas] = useState(false)
  const [nuevoEnlace, setNuevoEnlace] = useState({
    nombre: '',
    url: '',
  })
  const [idDesactivar, setIdDesactivar] = useState('')
  const [login, setLogin] = useState({
    usuario: '',
    password: '',
  })
  const [title, setTitle] = useState(null)
  const [error, setError] = useState(null)

  // LOAD DATA
  const fetchEnlaces = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/enlaces.php`)

      setEnlaces(res.data)

      // Seleccionar automáticamente el primer enlace
      if (res.data.length > 0) {
        setIdDesactivar(res.data[0].id)
      }

    } catch (error) {
      console.error('Error cargando enlaces:', error)
    }
  }

  useEffect(() => {
    fetchEnlaces()
  }, [])

  // MODALS
  const toggleAlta = () => {
    setModalAlta(!modalAlta)
  }

  const toggleDesactivar = () => {
    setModalDesactivar(!modalDesactivar)
  }

  const toggleCanvas = () => {
    setModalCanvas(!modalCanvas)
  }

  // FORM ALTA
  const handleInputChange = (event) => {
    const { name, value } = event.target

    setNuevoEnlace(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleStoreSubmit = () => {

    const nuevoId =
      enlaces.length > 0
        ? enlaces[enlaces.length - 1].id + 1
        : 1

    const enlace = {
      id: nuevoId,
      nombre: nuevoEnlace.nombre,
      url: nuevoEnlace.url,
    }

    setEnlaces(prev => [...prev, enlace])

    // limpiar formulario
    setNuevoEnlace({
      nombre: '',
      url: '',
    })

    // seleccionar el nuevo enlace
    setIdDesactivar(nuevoId)

    toggleAlta()
  }

  // DESACTIVAR
  const handleDesactivarSubmit = () => {

    const nuevosEnlaces = enlaces.filter(enlace => enlace.id !== Number(idDesactivar))

    setEnlaces(nuevosEnlaces)

    // actualizar selección
    if (nuevosEnlaces.length > 0) {
      setIdDesactivar(nuevosEnlaces[0].id)
    } else {
      setIdDesactivar('')
    }

    toggleDesactivar()
  }

  const handleLoginSubmit = async () => {
    try {

      const res = await axios.post(`${BASE_URL}/nuevos-usuarios.php`, login)

      setTitle(res.data.offcavas)
      setEnlaces(res.data.enlaces)
      setError(null)

    } catch (error) {
      setError(error.response.data.error)
    }
  }

  const handleLogOut = () => {
    fetchEnlaces()
    setLogin({
      usuario: '',
      password: '',
    })
    setTitle(null)
    setError(null)
  }

  // JSX
  return (
    <div className="App p-5">

      <Card className="p-4 d-flex gap-3">

        <h1>Menú con Reactstrap Breadcrumbs</h1>

        <ButtonGroup className="w-50 d-flex gap-2">

          <Button
            color="success"
            className="rounded"
            onClick={toggleAlta}
          >
            Alta
          </Button>

          <Button
            color="danger"
            className="rounded"
            onClick={toggleDesactivar}
            disabled={enlaces.length === 0}
          >
            Desactivar
          </Button>

        </ButtonGroup>

        <Breadcrumb>
          {enlaces.map(enlace => (
            <BreadcrumbItem key={enlace.id}>
              <a href={enlace.url}>
                {enlace.nombre}
              </a>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>

      </Card>

      <div className='mt-4'>
        <Button
          color="primary"
          onClick={toggleCanvas}
        >
          Open
        </Button>

        <Offcanvas isOpen={modalCanvas} toggle={toggleCanvas}>
          {title ? (
            <>
              <OffcanvasHeader toggle={toggleCanvas}>
                {title}
              </OffcanvasHeader>
              <OffcanvasBody>
                <Button color='danger' className='w-100 mt-2' onClick={handleLogOut}>Log Out</Button>
              </OffcanvasBody>
            </>
          ) : (
            <>
              <OffcanvasHeader toggle={toggleCanvas}>
                Offcanvas
              </OffcanvasHeader>

              <OffcanvasBody>
                <FormGroup>
                  <Label for="usuario">
                    Usuario
                  </Label>
                  <Input
                    id="usuario"
                    name="usuario"
                    placeholder="Ej: pepe12"
                    type="text"
                    onChange={(event) => setLogin(prev => ({
                      ...prev,
                      usuario: event.target.value,
                    }))}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="password">
                    Contraseña
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    placeholder="****"
                    type="password"
                    onChange={(event) => setLogin(prev => ({
                      ...prev,
                      password: event.target.value,
                    }))}
                  />
                </FormGroup>

                {error && <span className='text-danger'>{error}</span>}

                <Button color='primary' className='w-100 mt-2' onClick={handleLoginSubmit}>Login</Button>
              </OffcanvasBody>
            </>
          )}
        </Offcanvas>
      </div>

      {/* MODAL ALTA */}
      <Modal isOpen={modalAlta} toggle={toggleAlta}>

        <ModalHeader toggle={toggleAlta}>
          Nuevo Breadcrumb
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <Label for="nombre">
              Nombre
            </Label>
            <Input
              id="nombre"
              name="nombre"
              type="text"
              placeholder="Ej. Google"
              value={nuevoEnlace.nombre}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="url">
              URL
            </Label>
            <Input
              id="url"
              name="url"
              type="text"
              placeholder="https://google.com"
              value={nuevoEnlace.url}
              onChange={handleInputChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button
            color="secondary"
            onClick={toggleAlta}
          >
            Cancelar
          </Button>
          <Button
            color="primary"
            onClick={handleStoreSubmit}
          >
            Guardar
          </Button>
        </ModalFooter>

      </Modal>

      {/* MODAL DESACTIVAR */}
      <Modal
        isOpen={modalDesactivar}
        toggle={toggleDesactivar}
      >

        <ModalHeader toggle={toggleDesactivar}>
          Desactivar Breadcrumb
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <Label for="desactivar">
              Selecciona un breadcrumb
            </Label>
            <Input
              id="desactivar"
              type="select"
              value={idDesactivar}
              onChange={(e) =>
                setIdDesactivar(e.target.value)
              }
            >
              {enlaces.map(enlace => (
                <option key={enlace.id} value={enlace.id}>{enlace.nombre}</option>
              ))}
            </Input>

          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button
            color="secondary"
            onClick={toggleDesactivar}
          >
            Cancelar
          </Button>
          <Button
            color="danger"
            onClick={handleDesactivarSubmit}
          >
            Desactivar
          </Button>
        </ModalFooter>

      </Modal>

    </div>
  )
}

export default App
