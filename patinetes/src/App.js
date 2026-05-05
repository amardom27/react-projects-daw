import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
  Table
} from 'reactstrap';



const initialNuevoPatin = {
  numeroSerie: '',
  potencia: '',
  marca: '',
  modelo: '',
  color: '',
  precio: ''
};

function FormularioAltaPatin(props) {
  const [nuevoPatin, setNuevoPatin] = useState(initialNuevoPatin);
  const handleInputChange = (event) => {
    let n = nuevoPatin;
    if (event.target.name === "numeroSerie") {
      n.numeroSerie = event.target.value;
    }
    if (event.target.name === "marca") {
      n.marca = event.target.value;
    }
    if (event.target.name === "modelo") {
      n.modelo = event.target.value;
    }
    if (event.target.name === "color") {
      n.color = event.target.value;
    }
    if (event.target.name === "precio") {
      n.precio = event.target.value;
    }
    setNuevoPatin(n)
  };
  function handleAlta() {
    const altaCorrecta = props.onAlta(nuevoPatin);
    if (altaCorrecta) {
      setNuevoPatin(initialNuevoPatin);
    }
  }

  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle tag="h2" className="h5 mb-3">Dar de alta nuevo patín
          eléctrico</CardTitle>
        <Form>
          <Row>
            <Col md="2">
              <FormGroup>
                <Input
                  name="numeroSerie"
                  placeholder="No serie"
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Input
                  type="number"
                  min="0"
                  name="potencia"
                  placeholder="Potencia (W)"
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

            </Col>
            <Col md="2">
              <FormGroup>
                <Input
                  name="marca"
                  placeholder="Marca"
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Input
                  name="modelo"
                  placeholder="Modelo"
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Input
                  name="color"
                  placeholder="Color"
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Input
                  type="number"
                  min="0"
                  name="precio"
                  placeholder="Precio (€)"
                  onChange={handleInputChange}
                  required

                />
              </FormGroup>
            </Col>
          </Row>
          <Button color="primary" onClick={() => handleAlta()}>Agregar
            patín</Button>
        </Form>
      </CardBody>
    </Card>
  );
}

function intercambiar(arr, i, j) {
  const copia = [...arr]

  const temp = copia[i]
  copia[i] = copia[j]
  copia[j] = temp

  return copia
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patines: [],
      patinesDesclasificados: [],
    };

  }

  componentDidMount() {
    const url = "https://localhost/proyectos/cliente/patinetes/patinetes.php";
    axios.get(url)
      .then((response) => {
        this.setState({ patines: response.data || [] });
        console.log(response.data)
      })
      .catch(() => {
        this.setState({ patines: [] });
      });
  }

  handleEliminar = (numeroSerie) => {
    this.setState(prevState => ({ patines: prevState.patines.filter(p => p.numeroSerie !== numeroSerie) }))
  };

  handleAlta = (nuevoPatin) => {
    this.setState(prevState => ({ patines: [...prevState.patines, nuevoPatin] }))
  };

  handleSubir = (idx) => {
    this.setState(prevState => ({
      patines: intercambiar(prevState.patines, idx, idx - 1)
    }))
  };

  handleBajar = (idx) => {
    this.setState(prevState => ({
      patines: intercambiar(prevState.patines, idx, idx + 1)
    }))
  };

  handleDesclasificar = (idx) => {
    const desclasificado = this.state.patines[idx]

    this.setState(prevState => ({
      patines: [...prevState.patines.filter((_, i) => i !== idx)],
      patinesDesclasificados: [...prevState.patinesDesclasificados, desclasificado]
    }))
  }

  render() {

    let listaPatines = this.state.patines.map((patin, index) => {
      return (
        <tr key={`patin_${patin.numeroSerie}`}>
          <td>{patin.numeroSerie}</td>
          <td>{patin.potencia} W</td>
          <td>{patin.marca}</td>
          <td>{patin.modelo}</td>
          <td>{patin.color}</td>
          <td>{patin.precio} EUR</td>
          <td>
            <Button
              color="secondary"
              size="sm"
              type="button"
              className="me-2"
              disabled={index === 0}
              onClick={() => this.handleSubir(index)}
            >
              Subir
            </Button>
            <Button
              color="secondary"
              size="sm"
              type="button"
              className="me-2"
              disabled={index === this.state.patines.length - 1}
              onClick={() => this.handleBajar(index)}
            >
              Bajar
            </Button>
            <Button
              color="warning"
              size="sm"
              type="button"
              className="me-2"
              onClick={() => this.handleDesclasificar(index)}
            >
              Desclasificar
            </Button>
            <Button
              color="danger"
              size="sm"
              type="button"
              onClick={() => this.handleEliminar(patin.numeroSerie)}
            >
              Eliminar
            </Button>
          </td>
        </tr>
      )
    })

    const listadoDesclasificado = this.state.patinesDesclasificados.map(patin => (
      <tr key={`desclasificado_${patin.numeroSerie}`}>
        <td>{patin.numeroSerie}</td>
        <td>{patin.potencia} W</td>
        <td>{patin.marca}</td>
        <td>{patin.modelo}</td>
        <td>{patin.color}</td>
        <td>{patin.precio} EUR</td>
      </tr>
    ))

    return (
      <Container className="py-4">
        <h1 className="mb-4">Gestión de patines eléctricos</h1>
        <Table dark bordered responsive className="align-middle">
          <thead>
            <tr>
              <th>Número de serie</th>
              <th>Potencia</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Color</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr >

              <td>123456</td>
              <td> 250W</td>
              <td>SEGWAY</td>
              <td>TROMPUS</td>
              <td>NEGRO</td>
              <td>520 €</td>
              <td>
                <Button
                  color="danger"
                  size="sm"
                  type="button"
                >
                  Eliminar
                </Button>
              </td>
            </tr>
            {listaPatines}
          </tbody>
        </Table>
        <h2 className="h4 mt-4">Patinetes desclasificados</h2>
        <Table bordered responsive className="align-middle">
          <thead>
            <tr>
              <th>Numero de serie</th>
              <th>Potencia</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Color</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Numero de serie</td>
              <td>Potencia</td>
              <td>Marca</td>
              <td>Modelo</td>
              <td>Color</td>
              <td>Precio</td>
            </tr>
            {listadoDesclasificado}
          </tbody>
        </Table>
        <FormularioAltaPatin onAlta={this.handleAlta} />

      </Container>
    );
  }
}

export default App;