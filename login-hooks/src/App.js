import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, CardText, CardTitle, Col, FormGroup, Input, Label, Row, Navbar, NavbarBrand, NavLink } from 'reactstrap';
import './App.css';
import { Component, useState } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItem: "UNO",
      logged: false,
      info: "",
    }
  }

  changeMenu(item) {
    this.setState({ menuItem: item })
  }

  userLogin(email, password) {
    if (password === '' || email === '') {
      this.setState({ info: "Cumplimente los campos." })
    } else if (email === "myfpschool@mail.com" && password === "2023") {
      console.log("hola");
      this.setState({ logged: true, info: "" })
    } else {
      this.setState({ info: "Datos incorrectos." })
    }
  }

  render() {
    let obj = <Menu menuItem={this.state.menuItem} changeMenu={(item) => this.changeMenu(item)} />
    if (!this.state.logged) {
      obj = <AppLogin userLogin={(email, password) => this.userLogin(email, password)} info={this.state.info} />
    }

    return (
      <div className="App">
        {obj}
      </div>
    );
  }
}

function AppLogin(props) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleChange = (event) => {
    const target = event.target;
    if (target.name === "password") {
      setPassword(target.value);
    }
    if (target.name === "email") {
      setEmail(target.value);
    }
  }

  return (
    <Row className='mt-4'>
      <Col sm="4"></Col>
      <Col sm="4">
        <Card body>
          <CardTitle className="text-center" tag="h4">
            Log in
          </CardTitle>
          <FormGroup className="mb-2 me-sm-2 mb-sm-0">
            <Label className="me-sm-2" for="exampleEmail">User id</Label>
            <Input
              id="email"
              name="email"
              placeholder="type your user id"
              type="email"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="mb-2 me-sm-2 mb-sm-0">
            <Label className="me-sm-2 mt-2"
              for="examplePassword">Password</Label>
            <Input
              id="Password"
              name="password"
              type="password"
              onChange={handleChange}
            />
          </FormGroup>
          <br />
          <Button color="primary" size="lg" className='mt-4' block onClick={() => props.userLogin(email, password)}>
            <strong>Log in</strong>
          </Button>
          <CardText className="text-danger">{props.info}</CardText>
        </Card>
      </Col>
    </Row >
  )
}

function Menu(props) {
  let colorUno = 'secondary'
  let colorDos = 'secondary'
  let colorTres = 'secondary'
  switch (props.menuItem) {
    case 'UNO':
      colorUno = 'primary'
      break;
    case 'DOS':
      colorDos = 'primary'
      break;
    case 'TRES':
      colorTres = 'primary'
      break;
    default:
      break;
  }

  return (
    <div>
      <Navbar>
        <NavbarBrand href="/">MYFPSCHOOL</NavbarBrand>
        <NavLink>
          <Button color={colorUno} onClick={() => props.changeMenu("UNO")}>UNO</Button>{" "}
          <Button color={colorDos} onClick={() => props.changeMenu("DOS")}>DOS</Button>{" "}
          <Button color={colorTres} onClick={() => props.changeMenu("TRES")}>TRES</Button>
        </NavLink>
      </Navbar>
    </div>
  );
}

export default App;
