import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, FormGroup, Input, Label, Row, Navbar, NavbarBrand, NavLink } from 'reactstrap';
import './App.css';
import { Component, useState } from 'react';
import { PRODUCTS } from './data';

// API
// https://dummyjson.com/products

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: true,
      info: "",
    }
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
    let obj = <Menu changeMenu={(item) => this.changeMenu(item)} />
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
    </Row>
  )
}

function Menu(props) {
  const [filter, setFilter] = useState("all");

  const categories = [
    { key: "all", label: "All" },
    { key: "beauty", label: "Beauty" },
    { key: "fragrances", label: "Fragrances" },
    { key: "furniture", label: "Furniture" },
    { key: "groceries", label: "Groceries" },
  ];

  const filteredProducts = filter === "all" ? PRODUCTS.products : PRODUCTS.products.filter(p => p.category === filter);

  return (
    <div>
      <Navbar>
        <NavbarBrand href="/">MYFPSCHOOL</NavbarBrand>
        <NavLink className='d-flex gap-2'>
          {categories.map((c, i) => <Button key={i} color={c.key === filter ? "primary" : "secondary"} onClick={() => setFilter(c.key)}>{c.label}</Button>)}
        </NavLink>
      </Navbar>
      <div className="container my-4">
        <div className="row g-4">
          {filteredProducts.map((p, i) => (
            <div key={i} className="col-12 col-sm-6 col-md-4 d-flex">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProductCard({ product }) {
  return (
    <Card className="flex-fill shadow-sm">
      <img
        alt={product.title}
        src={product.thumbnail || product.images?.[0] || 'https://via.placeholder.com/300x200'}
        className="card-img-top object-fit-cover"
        style={{ height: '200px' }}
      />
      <CardBody className="d-flex flex-column justify-content-between">
        <div>
          <CardTitle tag="h5" className="fw-semibold text-truncate">
            {product.title}
          </CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {product.brand} — ${product.price.toFixed(2)}
          </CardSubtitle>
          <CardText className="small text-secondary">
            {product.description.length > 100
              ? product.description.slice(0, 100) + '...'
              : product.description}
          </CardText>
        </div>
        <Button color="primary" className="mt-3 align-self-start">Add to Cart</Button>
      </CardBody>
    </Card>
  );
}

export default App;
