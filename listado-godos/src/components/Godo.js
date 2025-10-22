import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";

function Godo({ id, imgSrc, nombre, descripcion, callback, children }) {
  // const handleDelete = () => {
  //   callback(id);
  // }

  return (
    <Card className="mb-4 h-100 d-flex flex-column align-items-center p-3">
      <img
        className="img-thumbnail img-fluid"
        alt={`Rey Godo ${nombre}`}
        src={imgSrc}
        style={{ width: '320px', height: 'auto' }}
      />
      <CardBody className="d-flex flex-column align-items-center">
        <CardTitle tag="h5">
          {nombre}
        </CardTitle>
        <CardText className="text-center">
          {descripcion}
        </CardText>
        {/* <Button onClick={handleDelete}>
          Borrar
        </Button> */}
        {children}
      </CardBody>
    </Card>
  )
}

export default Godo;