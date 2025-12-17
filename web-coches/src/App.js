import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row
} from "reactstrap";
import './App.css';
import { COCHES } from './constants';

const VehiculoCard = ({ vehiculo }) => {
  const { modelo, marca, combustible, precio_euros, descripcion } = vehiculo;

  return (
    <Card className="h-100">
      <CardBody>
        <CardTitle tag="h5">{modelo}</CardTitle>

        <CardText>
          <strong>Marca:</strong> {marca} <br />
          <strong>Combustible:</strong> {combustible} <br />
          <strong>Precio:</strong> {precio_euros}
        </CardText>

        <CardText>{descripcion}</CardText>
      </CardBody>
    </Card>
  );
};

const CatalogoVehiculos = () => (
  <Container className="my-5">
    <Row className="g-4">
      {COCHES.map((vehiculo, index) => (
        <Col md="4" key={index}>
          <VehiculoCard vehiculo={vehiculo} />
        </Col>
      ))}
    </Row>
  </Container>
);

const FiltroVehiculos = ({
  filtros,
  onChange,
  onAplicarFiltros
}) => {
  return (
    <Card className="mt-5">
      <CardBody>
        <h3 className="mb-3">Filtro de Vehículos</h3>

        <Form>
          <Row className="g-3">
            <Col md="3">
              <Label className="form-label">Nombre / Modelo</Label>
              <Input
                type="text"
                name="modelo"
                placeholder="Ej: Golf"
                value={filtros.modelo}
                onChange={onChange}
              />
            </Col>

            <Col md="3">
              <Label className="form-label">Marca</Label>
              <Input
                type="text"
                name="marca"
                placeholder="Ej: Toyota"
                value={filtros.marca}
                onChange={onChange}
              />
            </Col>

            <Col md="3">
              <Label className="form-label">Combustible</Label>
              <Input
                type="select"
                name="combustible"
                value={filtros.combustible}
                onChange={onChange}
              >
                <option value="">Todos</option>
                <option>Gasolina</option>
                <option>Diésel</option>
                <option>Eléctrico</option>
              </Input>
            </Col>

            <Col md="3">
              <Label className="form-label">Precio máximo (Euros)</Label>
              <Input
                type="number"
                name="precioMax"
                placeholder="30000"
                value={filtros.precioMax}
                onChange={onChange}
              />
            </Col>
          </Row>

          <div className="mt-4 text-end">
            <Button color="primary" type="button" onClick={onAplicarFiltros}>
              Aplicar filtros
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};

function App() {
  const [filtros, setFiltros] = useState({
    modelo: "",
    marca: "",
    combustible: "",
    precioMax: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros({
      ...filtros,
      [name]: value
    });
  };

  const handleFiltros = () => {
    console.log("Aplicar filtros");
  }

  return (
    <div className="App container my-5" >
      <h1 className='text-center'>Catálogo de Vehículos</h1>
      <CatalogoVehiculos />
      <FiltroVehiculos filtros={filtros} onChange={handleChange} onAplicarFiltros={handleFiltros} />
    </div >
  );
}

export default App;
