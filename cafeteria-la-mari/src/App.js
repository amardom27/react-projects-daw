import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import {
  Card, CardBody, CardTitle, CardSubtitle, CardText, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Navbar, Nav, Badge
} from 'reactstrap';


const Producto = (props) => {
  const { id, titulo, subtitulo, texto, imagen } = props.producto;
  const { handleClick } = props;
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
        <Button color="warning" onClick={() => {
          handleClick(id)
          console.log("añadir al pedido")
        }}>
          Añadir al pedido
        </Button>
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


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
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
  toggleModal() { this.setIsOpen(!this.state.isOpen) }

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

  render() {
    const numCarrito = this.state.productos.map(p => p.carrito).reduce((prev, curr) => prev + curr, 0);
    const productosCarrito = this.state.productos.filter(p => p.carrito > 0);

    return (
      <div className="App">
        <Navbar>
          <Nav className="me-auto" navbar>
            <Button color="primary" onClick={() => this.toggleModal()}>
              Carrito{" "}
              <Badge color="danger">{numCarrito}</Badge>
            </Button>
          </Nav>
        </Navbar>
        <Row>
          {this.state.productos.map((p, i) => <Col key={i}><Producto producto={p} handleClick={(id) => this.addToCart(id)} /></Col>)}
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
      </div>
    );
  }
}


export default App;
