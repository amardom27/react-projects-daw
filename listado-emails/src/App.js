import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Component } from 'react';

function UserList({ listado }) {
  return (
    <ul>
      {listado.map((user) => <li key={user.id}>{user.nombre} - {user.email}</li>)}
    </ul>
  );
}

function UserForm({ callback }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    callback(event);
  }

  return (
    <form onSubmit={handleSubmit}
      className='d-flex flex-column align-items-center gap-2'>
      <div className='w-100 d-flex justify-content-between gap-2'>
        <label htmlFor="nombre">Nombre: </label>
        <input type="text" name="nombre" id="nombre" />
      </div>
      <div className='w-100 d-flex justify-content-between gap-2'>
        <label htmlFor="email">Email: </label>
        <input type="email" name="email" id="email" />
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        { id: 1, nombre: "Pepe", email: "pepe@mail.com" },
        { id: 2, nombre: "Juan", email: "juan@mail.com" }
      ]
    };
  }

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   * 
   * @returns {void}
   */
  addUser = (event) => {
    const nombre = event.target.nombre.value.trim();
    const email = event.target.email.value.trim();

    if (!nombre || !email) {
      return;
    }
    // No emails duplicados
    if (this.state.users.find((u) => u.email === email)) {
      return;
    }

    const lastId = this.state.users.length ? this.state.users[this.state.users.length - 1].id : 0;
    const nuevoObjeto = { id: lastId + 1, nombre, email };

    this.setState(prevState => ({
      users: [...prevState.users, nuevoObjeto]
    }));

    event.target.reset();
  }

  render() {
    return (
      <div className="App min-h-100 d-flex flex-column align-items-center justify-content-center mt-5">
        <h1>Listado emails</h1>
        <UserList listado={this.state.users} />
        <UserForm callback={this.addUser} />
      </div>
    );
  }
}

export default App;

