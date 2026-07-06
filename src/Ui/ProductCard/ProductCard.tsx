import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-card__image"
          loading="lazy"
        />
      </div>
      <div className="product-card__body">
        <span className="product-card__category">{product.category}</span>
        <h2 className="product-card__title">{product.title}</h2>
        <div className="product-card__meta">
          <span className="product-card__price">{formatPrice(product.price)}</span>
          <span className="product-card__rating">★ {product.rating}</span>
        </div>
        <Link to={`/product/${product.id}`} className="product-card__btn">
          Details
        </Link>
      </div>
    </article>
  );
}
