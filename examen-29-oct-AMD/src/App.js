import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Component } from 'react';
import { Button, Card, CardBody, CardText, CardTitle, Col, Row } from 'reactstrap';

const GODOS = [
  { nombre: "Leovigildo", texto: "Vida y obra de Leovigildo." },
  { nombre: "Atanagildo", texto: "Vida y obra de Atanagildo." },
  { nombre: "Suintila", texto: "Vida y obra de Suintila." },
  { nombre: "Recaredo", texto: "Vida y obra de Recaredo." },
]

const BotonesGodos = (props) => {
  return (
    <>
      {props.godos.map((g, i) => {
        const color = g.nombre == props.seleccionado ? "primary" : "secondary";
        return (
          <Button key={i} color={color} onClick={() => props.handleClick(g.nombre)}>{g.nombre}</Button>
        )
      })}
    </>
  )
}

const Detalle = (props) => {
  return (
    <Card>
      <CardBody>
        <CardTitle style={{ fontWeight: "bold" }}>{props.godo.nombre}</CardTitle>
        <CardText>{props.godo.texto}</CardText>
      </CardBody>
      <Button onClick={() => props.handleClick(props.godo.nombre)}>{props.godo.nombre}</Button>
    </Card>
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      godos: [...GODOS],
      seleccionado: "Leovigildo",
    }
  }

  changeGodo = (nombre) => {
    this.setState({ seleccionado: nombre });
  }

  deleteGodo = (nombre) => {
    const nuevosGodos = [...this.state.godos].filter((g) => g.nombre !== nombre);
    const nuevoSeleccionado = nuevosGodos.length > 0 ? nuevosGodos[0].nombre : "";

    this.setState({
      godos: nuevosGodos,
      seleccionado: nuevoSeleccionado
    })
  }

  render() {
    const godoSeleccionadoObj = this.state.godos.find((g) => g.nombre == this.state.seleccionado);

    return (
      <div className="App" >
        <h4>Elimina y muestra Godos</h4>
        {this.state.godos.length > 0 &&
          <Row>
            <Col><BotonesGodos seleccionado={this.state.seleccionado} godos={this.state.godos} handleClick={this.changeGodo} /></Col>
            <Col><Detalle godo={godoSeleccionadoObj} handleClick={this.deleteGodo} /></Col>
          </Row>
        }
      </div>
    );
  }
}

export default App;
