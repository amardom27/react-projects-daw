import Godo from "./Godo";
import { Button } from "reactstrap";

function ListadoGodos({ godos, callback }) {
  return (
    <div className="container-fluid">
      <div className="row">
        {godos.map((g, index) => (
          <div className="col-12 col-md-4 mb-3" key={index}>
            <Godo id={g.id} imgSrc={g.imgSrc} nombre={g.nombre} descripcion={g.descripcion} callback={callback} >
              <Button color="danger" onClick={() => callback(g.id)}>
                Borrar
              </Button>
            </Godo>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListadoGodos;