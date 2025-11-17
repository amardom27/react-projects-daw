import { useState } from 'react';
import { Button, Card, CardText, CardTitle, Col, FormGroup, Input, Label, Row } from 'reactstrap';

export function AppLogin(props) {
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
