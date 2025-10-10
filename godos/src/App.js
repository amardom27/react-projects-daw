import { Component } from 'react';
import './App.css';
import { Flashcard } from './components/Flashcard';
import { GODOS } from './shared/godos';

class App extends Component {
  constructor() {
    super();
    this.state = {
      godos: GODOS,
    }
  }

  render() {
    const lista = this.state.godos.map((godo) => <Flashcard key={godo.id} nombre={godo.nombre} imgSrc={godo.imagen} texto={godo.texto} />);
    return (
      <div className="App row row-cols-2 p-4" >
        {lista}
      </div >
    );
  }
}

export default App;
