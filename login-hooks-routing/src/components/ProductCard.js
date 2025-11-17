import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';

export function ProductCard({ product, addToCart }) {
  return (
    <Card className="flex-fill shadow-sm">
      <img
        alt={product.title}
        src={product.thumbnail || product.images?.[0] || 'https://via.placeholder.com/300x200'}
        className="card-img-top object-fit-cover"
        style={{ height: '200px' }}
      />
      <CardBody className="d-flex flex-column justify-content-between">
        <div>
          <CardTitle tag="h5" className="fw-semibold text-truncate">
            {product.title}
          </CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {product.brand} — ${product.price.toFixed(2)}
          </CardSubtitle>
          <CardText className="small text-secondary">
            {product.description.length > 100
              ? product.description.slice(0, 100) + '...'
              : product.description}
          </CardText>
        </div>
        <Button color="primary" className="mt-3 align-self-start" onClick={() => addToCart(product.id)}>Add to Cart</Button>
      </CardBody>
    </Card>
  );
}