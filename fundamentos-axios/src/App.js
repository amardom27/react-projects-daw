import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from 'react';
import { Container, Button } from 'reactstrap';
import axios from 'axios';

const BASE = 'http://localhost:4000';

function App() {

  const [getData, setGetData] = useState(null);
  const [postData, setPostData] = useState(null);
  const [putData, setPutData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const run = (fn) => {
    setLoading(true);
    setError('');
    return fn()
      .catch((err) => {
        setError(err?.message || 'Error');
      })
      .finally(() => {
        setLoading(false);

      });
  };

  const handleGet = () =>
    run(() =>
      axios.get(`${BASE}/get.php?id=1`).then((res) => {
        setGetData(res.data);
      })
    );

  const handlePost = () =>
    run(() =>
      axios
        .post(`${BASE}/post.php`, {
          title: 'Hola',
          body: 'Ejemplo POST',

          userId: 1,
        })
        .then((res) => {
          setPostData(res.data);
        })
    );

  const handlePut = () =>
    run(() =>
      axios
        .put(`${BASE}/put.php?id=1`, {
          title: 'Actualizado',
          body: 'Ejemplo PUT',
          userId: 1,
        })
        .then((res) => {
          setPutData(res.data);
        })
    );

  const handleDelete = () =>
    run(() =>
      axios.delete(`${BASE}/delete.php?id=1`).then((res) => {
        setDeleteData({ status: res.status, ok: true });
      })
    );

  return (
    <Container className="py-4">
      <h1 className="mb-3">Axios: GET, POST, PUT y DELETE</h1>
      <p className="text-muted">Ejemplos muy simples usando PHP.</p>
      <div className="d-flex flex-wrap gap-2 mb-3">
        <Button color="primary" onClick={handleGet} disabled={loading}>
          GET
        </Button>
        <Button color="success" onClick={handlePost} disabled={loading}>
          POST

        </Button>
        <Button color="warning" onClick={handlePut} disabled={loading}>
          PUT
        </Button>
        <Button color="danger" onClick={handleDelete} disabled={loading}>
          DELETE
        </Button>
      </div>
      {loading && <div>Cargando...</div>}
      {error && <div className="text-danger">{error}</div>}
      <div className="mt-3">
        <h5>Respuesta GET</h5>
        <pre className="bg-light p-2 rounded">
          {JSON.stringify(getData, null, 2)}
        </pre>
      </div>
      <div className="mt-3">
        <h5>Respuesta POST</h5>
        <pre className="bg-light p-2 rounded">
          {JSON.stringify(postData, null, 2)}
        </pre>
      </div>
      <div className="mt-3">
        <h5>Respuesta PUT</h5>
        <pre className="bg-light p-2 rounded">
          {JSON.stringify(putData, null, 2)}
        </pre>
      </div>
      <div className="mt-3">
        <h5>Respuesta DELETE</h5>
        <pre className="bg-light p-2 rounded">
          {JSON.stringify(deleteData, null, 2)}
        </pre>
      </div>
    </Container>
  );
}


export default App;
