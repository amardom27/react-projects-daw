import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Col, Container, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap';
import './App.css';


const VentanaModalUser = (props) => {
  const { className, addUser } = props;

  const [telefono, setTelefono] = useState("");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");

  const handleChagne = (e, changeState) => {
    changeState(e.target.value);
  }

  const resetInputs = () => {
    setTelefono("");
    setNombre("");
    setPassword("");
  }

  return (
    <div>
      <Modal isOpen={props.mostrar} toggle={props.toggle} className={className}>
        <ModalHeader toggle={props.toggle}>{props.titulo}</ModalHeader>
        <ModalBody>
          {props.texto}
          <Input type="tel" name="telefono" id="tel" placeholder="teléfono" onChange={(e) => handleChagne(e, setTelefono)} />
          <Input type="text" name="nombre" id="nombre" placeholder="nombre" onChange={(e) => handleChagne(e, setNombre)} />
          <Input type="text" name="password" id="password" placeholder="password" onChange={(e) => handleChagne(e, setPassword)} />
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => {
            addUser(telefono, nombre, password);
            props.toggle();
            resetInputs();
          }} color="primary">{props.aceptar}</Button>
          <Button onClick={props.toggle} color="secondary">Salir</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

//********************************************************************
function Usuarios(props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);

  let objRow = props.datos.map((e, i) =>
    <tr key={i}>
      <td>{e.telefono}</td>
      <td>{e.nombre}</td>
      <td>{e.password}</td>
    </tr>
  )

  return (
    <div>
      <br />
      <Container>
        <Row>
          <Col>
            <Button onClick={() => toggleModal()} color="primary" >Alta de usuario</Button>
          </Col>
        </Row>
      </Container>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Teléfono</th>
            <th>Nombre</th>
            <th>password</th>
          </tr>
        </thead>
        <tbody>
          {objRow}
        </tbody>
      </Table>
      <VentanaModalUser toggle={toggleModal} mostrar={isOpen} aceptar={"Confirmar"} titulo={"Nuevo Usuario"} addUser={props.addUser} />
    </div>
  )
}

//***************************************************
function App() {
  const [usuarios, setUsuarios] = useState([
    { telefono: "123456", nombre: "fulano", password: "1234" },
    { telefono: "456456465", nombre: "mengano", password: "1213" }
  ]);

  const handleNewUser = (telefono, nombre, password) => {
    const nuevoTel = telefono.trim();
    const nuevoNom = nombre.trim();
    const nuevoPass = password.trim();

    if (nuevoTel === "" || nuevoNom === "" || nuevoPass === "") {
      return;
    }

    const telefonoRepetido = usuarios.find(u => u.telefono === nuevoTel);
    if (telefonoRepetido !== undefined) {
      return;
    }

    const newUser = { telefono: nuevoTel, nombre: nuevoNom, password: nuevoPass };
    setUsuarios(prevState => [...prevState, newUser]);
  }

  return (
    <div>
      <Usuarios datos={usuarios} addUser={handleNewUser} />
    </div>
  );
}

export default App;