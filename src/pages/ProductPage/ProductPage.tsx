import { useParams } from 'react-router-dom';
import { useProduct } from '../../hooks/useProduct';
import { BackButton } from '../../Ui/BackButton/BackButton';
import { ErrorMessage } from '../../Ui/ErrorMessage/ErrorMessage';
import { LoadingSpinner } from '../../Ui/LoadingSpinner/LoadingSpinner';
import { ProductDataView } from '../../Ui/ProductDataView/ProductDataView';
import './ProductPage.css';

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

      {product && !loading && !error && <ProductDataView product={product} />}
    </div>
  );
}
