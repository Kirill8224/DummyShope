import { useProducts } from '../../hooks/useProducts';
import type { Category } from '../../types';
import { EmptyState } from '../../Ui/EmptyState/EmptyState';
import { ErrorMessage } from '../../Ui/ErrorMessage/ErrorMessage';
import { LoadingSpinner } from '../../Ui/LoadingSpinner/LoadingSpinner';
import { ProductGrid } from '../../Ui/ProductGrid/ProductGrid';
import './HomePage.css';

interface HomePageProps {
  searchQuery: string;
  activeCategory: Category | null;
}

export function HomePage({ searchQuery, activeCategory }: HomePageProps) {
  const { products, loading, error, isEmpty } = useProducts(
    activeCategory,
    searchQuery
  );

  return (
    <div className="home-page">
      <header className="home-page__header">
        <h1 className="home-page__title">Our Products</h1>
        {activeCategory && (
          <p className="home-page__subtitle">
            Showing: {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
          </p>
        )}
      </header>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {isEmpty && <EmptyState message="Product not found." />}
      {!loading && !error && !isEmpty && products.length > 0 && (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
