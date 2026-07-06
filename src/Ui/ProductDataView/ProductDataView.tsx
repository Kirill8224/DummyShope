import type { Product, ProductDimensions, ProductMeta, ProductReview } from '../../types';
import './ProductDataView.css';

interface ProductDataViewProps {
  product: Product;
}

function formatLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (char) => char.toUpperCase())
    .trim();
}

function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleString();
}

interface FieldProps {
  label: string;
  value: string | number;
}

function Field({ label, value }: FieldProps) {
  return (
    <div className="product-data__field">
      <dt className="product-data__label">{label}</dt>
      <dd className="product-data__value">{value}</dd>
    </div>
  );
}

interface DimensionsViewProps {
  dimensions: ProductDimensions;
}

function DimensionsView({ dimensions }: DimensionsViewProps) {
  return (
    <section className="product-data__section">
      <h2 className="product-data__section-title">Dimensions</h2>
      <dl className="product-data__grid">
        <Field label="Width" value={`${dimensions.width} cm`} />
        <Field label="Height" value={`${dimensions.height} cm`} />
        <Field label="Depth" value={`${dimensions.depth} cm`} />
      </dl>
    </section>
  );
}

interface ReviewsViewProps {
  reviews: ProductReview[];
}

function ReviewsView({ reviews }: ReviewsViewProps) {
  return (
    <section className="product-data__section">
      <h2 className="product-data__section-title">Reviews ({reviews.length})</h2>
      <div className="product-data__reviews">
        {reviews.map((review) => (
          <article
            key={`${review.reviewerEmail}-${review.date}`}
            className="product-data__review"
          >
            <div className="product-data__review-header">
              <span className="product-data__review-rating">★ {review.rating}</span>
              <span className="product-data__review-author">{review.reviewerName}</span>
            </div>
            <p className="product-data__review-comment">{review.comment}</p>
            <dl className="product-data__review-meta">
              <Field label="Email" value={review.reviewerEmail} />
              <Field label="Date" value={formatDate(review.date)} />
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}

interface MetaViewProps {
  meta: ProductMeta;
}

function MetaView({ meta }: MetaViewProps) {
  return (
    <section className="product-data__section">
      <h2 className="product-data__section-title">Meta</h2>
      <dl className="product-data__grid">
        <Field label="Created At" value={formatDate(meta.createdAt)} />
        <Field label="Updated At" value={formatDate(meta.updatedAt)} />
        <Field label="Barcode" value={meta.barcode} />
      </dl>
      <div className="product-data__qr">
        <span className="product-data__label">QR Code</span>
        <img
          src={meta.qrCode}
          alt={`QR code for ${meta.barcode}`}
          className="product-data__qr-image"
        />
      </div>
    </section>
  );
}

export function ProductDataView({ product }: ProductDataViewProps) {
  return (
    <article className="product-data">
      <header className="product-data__header">
        <span className="product-data__category">{product.category}</span>
        <h1 className="product-data__title">{product.title}</h1>
        <p className="product-data__description">{product.description}</p>
      </header>

      <section className="product-data__section">
        <h2 className="product-data__section-title">Images</h2>
        <div className="product-data__gallery">
          <figure className="product-data__figure">
            <img
              src={product.thumbnail}
              alt={`${product.title} thumbnail`}
              className="product-data__image"
            />
            <figcaption className="product-data__caption">Thumbnail</figcaption>
          </figure>
          {product.images.map((image) => (
            <figure key={image} className="product-data__figure">
              <img
                src={image}
                alt={product.title}
                className="product-data__image"
              />
            </figure>
          ))}
        </div>
      </section>

      <section className="product-data__section">
        <h2 className="product-data__section-title">General Information</h2>
        <dl className="product-data__grid">
          <Field label="ID" value={product.id} />
          <Field label="Title" value={product.title} />
          <Field label="Brand" value={product.brand} />
          <Field label="Category" value={product.category} />
          <Field label="SKU" value={product.sku} />
          <Field label="Weight" value={`${product.weight} g`} />
          <Field label="Availability" value={product.availabilityStatus} />
        </dl>
      </section>

      <section className="product-data__section">
        <h2 className="product-data__section-title">Pricing &amp; Inventory</h2>
        <dl className="product-data__grid">
          <Field label="Price" value={formatPrice(product.price)} />
          <Field
            label={formatLabel('discountPercentage')}
            value={`${product.discountPercentage}%`}
          />
          <Field label="Rating" value={`★ ${product.rating}`} />
          <Field label="Stock" value={`${product.stock} units`} />
          <Field
            label={formatLabel('minimumOrderQuantity')}
            value={product.minimumOrderQuantity}
          />
        </dl>
      </section>

      <section className="product-data__section">
        <h2 className="product-data__section-title">Tags</h2>
        <ul className="product-data__tags">
          {product.tags.map((tag) => (
            <li key={tag} className="product-data__tag">
              {tag}
            </li>
          ))}
        </ul>
      </section>

      <DimensionsView dimensions={product.dimensions} />

      <section className="product-data__section">
        <h2 className="product-data__section-title">Policies &amp; Shipping</h2>
        <dl className="product-data__grid product-data__grid--wide">
          <Field label="Warranty" value={product.warrantyInformation} />
          <Field label="Shipping" value={product.shippingInformation} />
          <Field label="Return Policy" value={product.returnPolicy} />
        </dl>
      </section>

      <ReviewsView reviews={product.reviews} />
      <MetaView meta={product.meta} />
    </article>
  );
}
