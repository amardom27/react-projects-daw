import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import './App.css';
import { AppLogin } from './components/AppLogin';
import { Menu } from './components/Menu';

// API
// https://dummyjson.com/products

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      info: "",
    }
  }

  userLogin(email, password) {
    if (password === '' || email === '') {
      this.setState({ info: "Cumplimente los campos." })
    } else if (email === "myfpschool@mail.com" && password === "2023") {
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

export default App;