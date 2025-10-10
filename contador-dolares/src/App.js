import { Button } from 'reactstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';

const DOL_EUR = 0.86;

class App extends Component {
  constructor() {
    super();
    this.state = {
      dolares: 0,
      euros: 0,
    }
  }

  cambiarDolares(num) {
    const nuevoDolares = this.state.dolares + num;
    this.setState({
      dolares: nuevoDolares,
      euros: (nuevoDolares * DOL_EUR),
    });
  }

  render() {
    return (
      <div className="App min-vh-100 d-flex flex-column justify-content-center align-items-center" >
        <h3>{this.state.dolares} dolares - {this.state.euros.toFixed(2)} euros</h3>
        <div>
          <Button outline color='warning' onClick={() => this.cambiarDolares(1)}>+1</Button>
          <Button outline color='info' onClick={() => this.cambiarDolares(3)}>+3</Button>
          <Button outline color='danger' onClick={() => this.cambiarDolares(5)}>+5</Button>
          <Button outline color='primary' onClick={() => this.cambiarDolares(-5)}>-5</Button>
          <Button outline color='secondary' onClick={() => this.cambiarDolares(-1)}>-1</Button>
        </div>
      </div>
    );

  }
}

export default App;
