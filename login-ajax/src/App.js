import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Form, FormGroup, Label, Input, Button, Toast, ToastHeader, ToastBody } from 'reactstrap';
import { useState } from 'react';

function App() {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");

  const [login, setLogin] = useState({
    tipo: null,
    mensaje: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "usuario") {
      setUsuario(value);
    } else if (name === "clave") {
      setClave(value);
    }
  }

  const handleSubmit = () => {
    const xmlhttp = new XMLHttpRequest();
    const url = "http://localhost/proyectos/cliente/login-php/login";

    const params = `usuario=${encodeURIComponent(usuario)}&clave=${encodeURIComponent(clave)}`;

    xmlhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const res = JSON.parse(this.responseText);

        if (res.mensaje) {
          setLogin({ tipo: "OK", mensaje: res.mensaje });
        } else {
          setLogin({ tipo: "ERROR", mensaje: res.error });
        }
      }
    }
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send(params);

    setUsuario("");
    setClave("");
  }

  const toastColor =
    login.tipo === "OK"
      ? "bg-success text-white"
      : login.tipo === "ERROR"
        ? "bg-danger text-white"
        : "";

  return (
    <div className="App">
      <h1 className='mb-4'>Formulario Login</h1>
      <Form>
        <FormGroup>
          <Label for="usuario">
            Usuario
          </Label>
          <Input
            id="usuario"
            name="usuario"
            placeholder="Ej: juan12"
            type="text"
            value={usuario}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="clave">
            Password
          </Label>
          <Input
            id="clave"
            name="clave"
            placeholder=""
            type="password"
            value={clave}
            onChange={handleChange}
          />
        </FormGroup>
        <Button type="button" onClick={handleSubmit}>
          Login
        </Button>
      </Form>
      {
        login.tipo &&
        <Toast className={`w-100 mt-5 ${toastColor}`}>
          <ToastHeader>
            {login.tipo === "OK" ? "Login correcto" : "Error de login"}
          </ToastHeader>
          <ToastBody>
            {login.mensaje}
          </ToastBody>
        </Toast>
      }
    </div>
  );
}

export default App;
