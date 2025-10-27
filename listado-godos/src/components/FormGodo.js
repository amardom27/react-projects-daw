function FormGodo({ callback }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    callback(event);
  }

  return (
    <form action="" method="post" className="container mt-4 p-4 border rounded shadow-sm bg-light" onSubmit={handleSubmit}>
      <h3>Formulario</h3>

      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombre:</label>
        <input type="text" className="form-control" name="nombre" id="nombre" placeholder="Escribe el nombre" />
      </div>

      <div className="mb-3">
        <label htmlFor="descripcion" className="form-label">Descripción:</label>
        <input type="text" className="form-control" name="descripcion" id="descripcion" placeholder="Una pequeña descripcion" />
      </div>

      <div className="mb-3">
        <label htmlFor="imagen" className="form-label">Imagen:</label>
        <input type="text" className="form-control" name="imagen" id="imagen" placeholder="URL de la imagen" />
      </div>

      <button type="submit" className="btn btn-primary">Guardar</button>
    </form>

  );
}

export default FormGodo;