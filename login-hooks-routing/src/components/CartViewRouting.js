import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Button, Table } from 'reactstrap';

export function CartViewRouting() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const cartItems = state?.cartItems || [];
  const logged = state?.logged || false;

  useEffect(() => {
    if (!logged) {
      navigate("/");
    }
  }, [logged, navigate]);

  if (!logged) {
    return null; // evita que aparezca el componente ni un microsegundo
  }

  const onBack = () => navigate("/menu", {
    state: {
      logged
    }
  });

  // Calcular el total del carrito
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container my-4">
      <h3 className="mb-4">Tu carrito</h3>

      {cartItems.length === 0 ? (
        <p className="text-muted">No tienes productos en el carrito.</p>
      ) : (
        <>
          <Table bordered responsive>
            <thead className="table-light">
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, i) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <h5>Total: ${total.toFixed(2)}</h5>
            <div className="d-flex gap-2">
              <Button color="danger" outline onClick={console.log("clear")}>
                Vaciar carrito
              </Button>
              <Button color="success" onClick={() => alert("Compra realizada ✅")}>
                Finalizar compra
              </Button>
            </div>
          </div>
        </>
      )
      }

      <div className="mt-4">
        <Button color="secondary" onClick={onBack}>
          Volver a la tienda
        </Button>
      </div>
    </div >
  );
}
