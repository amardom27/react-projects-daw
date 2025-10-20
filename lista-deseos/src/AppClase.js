import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import { Button } from 'reactstrap';
import './App.css';

function Borrar(props) {
    return (
        <Button onClick={() => { props.quitar(props.deseo) }}>Borrar {props.deseo}</Button>
    )
}

class DesireList extends Component {
    render() {
        return (
            <ul>
                {this.props.deseos.map(d => {
                    return (
                        <>
                            <li>{d} &nbsp;<Borrar deseo={d} quitar={(elemento) => this.props.quitar(elemento)} /></li>
                        </>
                    )
                })
                }
            </ul>
        )
    }
}

class Desire extends Component {
    render() {
        return (
            <form onSubmit={this.props.onAddDeseo}>
                <input type="text" placeholder="Escribe tu deseo" name="deseo" />
            </form>
        )
    }
}

class AppClase extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deseos: ["GAMBAS", "JAMÓN DEL BUENO"],
        }
    }
    handleAniadirDeseo(event) {
        event.preventDefault();
        let aux = this.state.deseos;
        aux.push(event.target.deseo.value)
        this.setState({ deseos: aux })
    }
    quitar(elemento) {
        let aux = this.state.deseos;
        //quitar del estado elemento
        aux = aux.filter(i => i != elemento)
        this.setState({ deseos: aux })
    }
    render() {
        return (
            <div className="App">
                <h2>Lista de deseos</h2>
                <h6>Añade tu regalo favorito</h6>
                <DesireList deseos={this.state.deseos} quitar={(elemento) => this.quitar(elemento)} />
                <Desire onAddDeseo={this.handleAniadirDeseo.bind(this)} />
            </div>
        );
    }
}

export default AppClase;
