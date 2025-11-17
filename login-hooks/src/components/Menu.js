import { useState } from 'react';
import { Button, Nav, Navbar, NavbarBrand } from 'reactstrap';
import { PRODUCTS } from '../data';
import { CartView } from './CartView';
import { ProductCard } from './ProductCard';

export function Menu() {
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [filter, setFilter] = useState("all");
  const [cartItems, setCartItems] = useState([]);

  const categories = [
    { key: "all", label: "All" },
    { key: "beauty", label: "Beauty" },
    { key: "fragrances", label: "Fragrances" },
    { key: "furniture", label: "Furniture" },
    { key: "groceries", label: "Groceries" },
  ];

  const filteredProducts = filter === "all" ? PRODUCTS.products : PRODUCTS.products.filter(p => p.category === filter);

  const addToCart = (idProduct) => {
    // Buscar el producto en el catálogo
    const product = PRODUCTS.products.find((p) => p.id === idProduct);

    // Si no existe, no hacemos nada
    if (!product) return;

    // Verificar si ya está en el carrito
    const existingItem = cartItems.find((item) => item.id === idProduct);

    if (existingItem) {
      // Si ya está, aumentamos la cantidad
      const updatedCart = cartItems.map((item) =>
        item.id === idProduct
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCart);
    } else {
      // Si no está, lo agregamos con quantity = 1
      const newItem = { ...product, quantity: 1 };
      setCartItems([...cartItems, newItem]);
    }
  };

  const backToProducts = () => {
    setIsOpenCart(false);
  }

  return (
    <>
      {
        isOpenCart ? (
          <>
            <CartView cartItems={cartItems} onBack={backToProducts} />
          </>
        ) : (
          <div>
            <Navbar className="flex-column align-items-start">
              <div className="w-100 d-flex justify-content-between align-items-center mb-2">
                <NavbarBrand href="/">MYFPSCHOOL</NavbarBrand>
                <Button color="success" onClick={() => setIsOpenCart(true)}>Cart</Button>
              </div>
              <Nav className="w-100 d-flex flex-wrap justify-content-center gap-2">

                {categories.map((c, i) => (
                  <Button
                    key={i}
                    color={c.key === filter ? "primary" : "secondary"}
                    onClick={() => setFilter(c.key)}
                  >
                    {c.label}
                  </Button>
                ))}
              </Nav>
            </Navbar>

            <div className="container my-4">
              <div className="row g-4">
                {filteredProducts.map((p, i) => (
                  <div key={i} className="col-12 col-sm-6 col-md-4 d-flex">
                    <ProductCard product={p} addToCart={addToCart} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}