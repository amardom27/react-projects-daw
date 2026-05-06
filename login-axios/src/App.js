import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { useState } from 'react';

function App() {

  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className='container mt-5 my-0'>
      <h1 className='mb-4'>Ejemplo Login</h1>
      <Form>
        <FormGroup>
          <Label for="exampleEmail">
            Email
          </Label>
          <Input
            id="exampleEmail"
            name="email"
            placeholder="with a placeholder"
            type="email"
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">
            Password
          </Label>
          <Input
            id="examplePassword"
            name="password"
            placeholder="password placeholder"
            type="password"
          />
        </FormGroup>
      </Form>
    </div>
  );
}

export default App;
