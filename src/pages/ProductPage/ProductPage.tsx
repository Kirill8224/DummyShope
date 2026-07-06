import { useParams } from 'react-router-dom';
import { useProduct } from '../../hooks/useProduct';
import { BackButton } from '../../Ui/BackButton/BackButton';
import { ErrorMessage } from '../../Ui/ErrorMessage/ErrorMessage';
import { LoadingSpinner } from '../../Ui/LoadingSpinner/LoadingSpinner';
import './ProductPage.css';

function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const { product, loading, error } = useProduct(productId);

  if (Number.isNaN(productId)) {
    return <ErrorMessage message="Invalid product ID." />;
  }

  return (
    <div className="product-page">
      <BackButton />

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}

      {product && !loading && !error && (
        <article className="product-detail">
          <div className="product-detail__gallery">
            {product.images.map((image) => (
              <img
                key={image}
                src={image}
                alt={product.title}
                className="product-detail__image"
              />
            ))}
          </div>

          <div className="product-detail__info">
            <span className="product-detail__category">{product.category}</span>
            <h1 className="product-detail__title">{product.title}</h1>
            <p className="product-detail__brand">Brand: {product.brand}</p>
            <p className="product-detail__description">{product.description}</p>

            <div className="product-detail__stats">
              <div className="product-detail__stat">
                <span className="product-detail__stat-label">Price</span>
                <span className="product-detail__stat-value product-detail__price">
                  {formatPrice(product.price)}
                </span>
              </div>
              <div className="product-detail__stat">
                <span className="product-detail__stat-label">Rating</span>
                <span className="product-detail__stat-value product-detail__rating">
                  ★ {product.rating}
                </span>
              </div>
              <div className="product-detail__stat">
                <span className="product-detail__stat-label">Stock</span>
                <span className="product-detail__stat-value">
                  {product.stock} units
                </span>
              </div>
            </div>
          </div>
        </article>
      )}
    </div>
  );
}
