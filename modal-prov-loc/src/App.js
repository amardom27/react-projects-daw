import 'bootstrap/dist/css/bootstrap.min.css';
import { useMemo, useState } from 'react';
import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import './App.css';
import { PROVINCIAS } from './constantes/provincia';

function ModalBuscar({ isOpen, toggle, datos, title, onSelect }) {
  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");

  const datosFiltrados = useMemo(() => {
    return datos.filter(d => d.toLowerCase().includes(query.toLowerCase()));
  }, [datos, query])

  const handleSelection = () => {
    if (selected) {
      const value = selected;

      toggle(); // cerrar modal primero

      // Esperar a que termine la animación antes de cambiar la UI
      setTimeout(() => {
        onSelect(value);
        setSelected("");
        setQuery("");
      }, 200); // 200ms
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="buscador">Buscar</Label>
          <Input
            id="buscador"
            placeholder={`Teclee para buscar ${title.toLowerCase()}`}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </FormGroup>
        <div className='d-flex flex-wrap gap-2'>
          {datosFiltrados.map((item, i) => (
            <Button
              key={i}
              color={item === selected ? 'primary' : 'secondary'}
              onClick={() => setSelected(item)}
            >
              {item}
            </Button>
          ))}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSelection} disabled={!selected}>
          Seleccionar
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  )
}

function Formluario({ provincia, localidad, openModal, onReset }) {
  return (
    <>
      <div className='d-flex align-items-end gap-3 mb-3'>
        <div>
          <Label
            for="provincia"
          >
            Provincia
          </Label>
          <Input
            style={{ maxWidth: "400px" }}
            id="provincia"
            name="provincia"
            placeholder="Provincia"
            type="text"
            value={provincia}
            disabled
          />
        </div>
        <Button style={{ height: "auto" }} color='primary' onClick={() => openModal("provincia")}>
          Buscar
        </Button>
      </div>

      <div className='d-flex align-items-end gap-3'>
        <div>
          <Label
            for="localidad"
          >
            Localidad
          </Label>
          <Input
            style={{ maxWidth: "400px" }}
            id="localidad"
            name="localidad"
            placeholder="Localidad"
            type="text"
            value={localidad}
            disabled
          />
        </div>
        <Button style={{ height: "auto" }} color={provincia === "" ? 'secondary' : 'primary'} disabled={provincia === "" ? true : false} onClick={() => openModal("localidad")}>
          Buscar
        </Button>
      </div>
      <Button className='mt-4' style={{ height: "auto" }} color="danger" onClick={() => onReset()}>
        Reset
      </Button>
    </>
  )
}

function App() {
  const [provincia, setProvincia] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [modalState, setModalState] = useState({ tipo: null, abierto: false });

  const provinciasArr = PROVINCIAS["Andalucía"].provincias.map(p => p.nombre);
  const localidadesArr = useMemo(() => provincia === "" ? [] : PROVINCIAS["Andalucía"].provincias.find(p => p.nombre === provincia).municipios, [provincia]);

  const openModal = (tipo) => setModalState({ tipo, abierto: true });
  const closeModal = () => setModalState({ tipo: null, abierto: false });

  const handleProvinciaSelection = (nombreProv) => {
    setProvincia(nombreProv);
    setLocalidad("");
  }

  const resetAll = () => {
    setProvincia("");
    setLocalidad("");
  }

  return (
    <div className="App p-3">
      <Formluario provincia={provincia} localidad={localidad} openModal={openModal} onReset={resetAll} />

      <ModalBuscar
        isOpen={modalState.abierto}
        toggle={closeModal}
        title={modalState.tipo === "provincia" ? "Provincia" : "Localidad"}
        datos={modalState.tipo === "provincia" ? provinciasArr : localidadesArr}
        onSelect={modalState.tipo === "provincia" ? handleProvinciaSelection : setLocalidad}
        provincia={provincia}
      />
    </div>
  );
}

export default App;
