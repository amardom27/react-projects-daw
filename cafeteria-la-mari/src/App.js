import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import {
  Card, CardBody, CardTitle, CardSubtitle, CardText, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Navbar, Nav, Badge, Form, FormGroup, Label, Input,
} from 'reactstrap';


const Producto = (props) => {
  // Producto
  const { id, titulo, subtitulo, texto, imagen } = props.producto;

  // Props
  const { handleClick, toggle } = props;

  return (
    <Card
      style={{
        width: '18rem'
      }}
    >
      <img alt="cafetería la Mari" src={imagen} width="285" height="200" />
      <CardBody>
        <CardTitle tag="h5">
          {titulo}
        </CardTitle>
        <CardSubtitle
          className="mb-2 text-muted"
          tag="h6"
        >
          {subtitulo}
        </CardSubtitle>
        <CardText>
          {texto}
        </CardText>
        <div className='d-flex justify-content-between'>
          <Button color="warning" onClick={() => {
            handleClick(id)
          }}>
            Añadir al pedido
          </Button>
          <Button color="info" onClick={() => toggle(id)}>
            Modificar
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}


const VentanaModal = (props) => {
  const { className, mostrar, toggle, titulo, textoBtn, productos, handleAdd, handleRemove } = props;

  return (
    <div>
      <Modal isOpen={mostrar} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{titulo}</ModalHeader>
        <ModalBody>
          {productos.length > 0 ? (
            productos.map((p) => (
              <div key={p.id}>
                <strong>{p.titulo} --- {p.carrito}</strong>{' '}
                <Button color='success' size="sm" onClick={() => handleAdd(p.id)}>+</Button>
                <Button color='danger' size="sm" onClick={() => handleRemove(p.id)}>-</Button>
              </div>
            ))
          ) : (
            <div>No hay productos en el carrito.</div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>{textoBtn}</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </ModalFooter>
      </Modal>
    </div >
  );
}


function ModificarVentanaModal({ mostrar, toggle, titulo, textoBtn, producto, onChange, onSubmit }) {
  return (
    <div>
      <Modal isOpen={mostrar} toggle={toggle}>
        <ModalHeader toggle={toggle}>{titulo}</ModalHeader>
        <ModalBody>
          {producto
            ? (<FormularioProducto producto={producto} onChange={onChange} />)
            : (<FormularioProducto producto={producto} onChange={onChange} />)}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onSubmit}>{textoBtn}</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </ModalFooter>
      </Modal>
    </div >
  );
}


function FormularioProducto({ producto, onChange }) {
  const prod = producto || { titulo: "", imagen: "", subtitulo: "", texto: "" }

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  }

  return (
    <Form>
      <FormGroup>
        <Label for="titulo">Título</Label>
        <Input
          id="titulo"
          name="titulo"
          type="text"
          value={prod.titulo}
          onChange={handleChange}
          placeholder="Introduce el título"
        />
      </FormGroup>

      <FormGroup>
        <Label for="imagen">URL de la imagen</Label>
        <Input
          id="imagen"
          name="imagen"
          type="url"
          value={prod.imagen}
          onChange={handleChange}
          placeholder="https://..."
        />
      </FormGroup>

      <FormGroup>
        <Label for="subtitulo">Subtítulo</Label>
        <Input
          id="subtitulo"
          name="subtitulo"
          type="text"
          value={prod.subtitulo}
          onChange={handleChange}
          placeholder="Introduce el subtítulo"
        />
      </FormGroup>

      <FormGroup>
        <Label for="texto">Descripción</Label>
        <Input
          id="texto"
          name="texto"
          type="textarea"
          value={prod.texto}
          onChange={handleChange}
          placeholder="Descripción del producto"
        />
      </FormGroup>
    </Form>
  )
}


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      isOpenEditar: { open: false, tipo: "" },
      productoEditando: {},
      modoEditar: null,
      productos: [
        {
          id: 1,
          titulo: "Café",
          imagen: "https://cdn.pixabay.com/photo/2020/09/21/05/57/coffee-5589036_1280.jpg",
          subtitulo: "Café recién molido",
          texto: "Una taza de café aromático elaborado con granos seleccionados para empezar bien el día.",
          carrito: 0
        },
        {
          id: 2,
          titulo: "Tostada",
          imagen: "https://img-global.cpcdn.com/recipes/d2238d5a3e8ab530/680x781f0.56303_0.463404_1.36018q80/tostada-crujiente-de-aguacate-foto-principal.jpg",
          subtitulo: "Tostada crujiente",
          texto: "Deliciosa tostada de pan artesano, acompañada de aceite de oliva virgen extra o mantequilla.",
          carrito: 0
        },
        {
          id: 3,
          titulo: "Refresco",
          imagen: "https://images.stockcake.com/public/a/c/b/acb75fb8-a212-4593-9c2c-2a2ec10c1503_large/colorful-drinks-toast-stockcake.jpg",
          subtitulo: "Bebida refrescante",
          texto: "Refresco frío ideal para acompañar cualquier comida o para disfrutar en un descanso.",
          carrito: 0
        }
      ]
    }
  }

  setIsOpen(d) {
    if (d === undefined) return;
    this.setState({ isOpen: d })
  }

  toggleModal() {
    this.setIsOpen(!this.state.isOpen)
  }

  addToCart(id) {
    const nuevosProductos = this.state.productos.map(p => {
      if (p.id === id) {
        return { ...p, carrito: p.carrito + 1 };
      }
      return p;
    });

    this.setState({ productos: nuevosProductos });
  }

  removeFromCart(id) {
    const nuevosProductos = this.state.productos.map(p => {
      if (p.id === id) {
        return { ...p, carrito: p.carrito - 1 };
      }
      return p;
    });

    this.setState({ productos: nuevosProductos });
  }

  toggleEditar = (idProd) => {
    this.setState(prev => {
      const productoSeleccionado = prev.productos.find(p => p.id === idProd);

      return {
        isOpenEditar: { open: !prev.isOpenEditar.open, tipo: "" },
        productoEditando: productoSeleccionado ? { ...productoSeleccionado } : null,
        modoEditar: "editar"
      }
    })
  }


  // Cambiar propiedad al escribir en el formulario
  handleEditChange = (campo, valor) => {
    this.setState(prev => {
      const productoActualizado = {
        ...prev.productoEditando,
        [campo]: valor
      }
      return { productoEditando: productoActualizado };
    })
  }

  // Guardar cambios en el array y cerrar el modal
  saveChanges = () => {
    this.setState(prev => {
      const productosActualizados = prev.productos.map(p =>
        p.id === prev.productoEditando.id ? prev.productoEditando : p
      )

      return {
        productos: productosActualizados,
        isOpenEditar: { open: false, tipo: "" }
      }
    })
  }

  toggleAgregar = () => {
    const lastId = this.state.productos[this.state.productos.length - 1].id + 1;

    this.setState(prev => ({
      isOpenEditar: { open: !prev.isOpenEditar.open, tipo: "" },
      productoEditando: prev.isOpenEditar.open
        ? null
        : { id: lastId, titulo: "", imagen: "", subtitulo: "", texto: "", carrito: 0 },
      modoEditar: "agregar"
    }));
  }

  addNewProduct = () => {
    this.setState(prev => ({
      productos: [...prev.productos, prev.productoEditando],
      isOpenEditar: { open: false, tipo: "" },
      productoEditando: null,
      modoEditar: null
    }));
  }

  guardarProducto = () => {
    if (this.state.modoEditar === "editar") {
      // actualizar
      this.saveChanges();
    } else {
      // agregar
      this.addNewProduct();
    }
  }

  render() {
    const numCarrito = this.state.productos.map(p => p.carrito).reduce((prev, curr) => prev + curr, 0);
    const productosCarrito = this.state.productos.filter(p => p.carrito > 0);

    return (
      <div className="App p-2">
        <Navbar className='flui'>
          <Nav className="me-auto" navbar>
            <Button color="primary" onClick={() => this.toggleModal()}>
              Carrito{" "}
              <Badge color="danger">{numCarrito}</Badge>
            </Button>
          </Nav>
        </Navbar>
        <Row>
          {this.state.productos.map((p, i) => <Col key={i}><Producto producto={p} handleClick={(id) => this.addToCart(id)} toggle={this.toggleEditar} /></Col>)}
        </Row>
        <VentanaModal
          mostrar={this.state.isOpen}
          toggle={() => this.toggleModal()}
          titulo={"Carrito - Cafetería La Mari"}
          textoBtn={"Cerrar"}
          productos={productosCarrito}
          handleAdd={(id) => this.addToCart(id)}
          handleRemove={(id) => this.removeFromCart(id)}
        />
        <ModificarVentanaModal
          mostrar={this.state.isOpenEditar.open}
          toggle={this.toggleAgregar} // lo usaremos también para cerrar
          titulo={this.state.modoEditar === "editar" ? "Modificar" : "Agregar producto"}
          textoBtn={this.state.modoEditar === "editar" ? "Guardar cambios" : "Agregar"}
          producto={this.state.productoEditando}
          onChange={this.handleEditChange}
          onSubmit={this.guardarProducto}
        />
        <Button className='mt-4' color='primary' onClick={this.toggleAgregar}>Agregar</Button>
      </div>
    );
  }
}

export default App;
