import { useEffect, useState } from 'react';
import {
  fetchProducts,
  fetchProductsByCategory,
  searchProducts,
} from '../Api/api';
import type { Category, Product } from '../types';

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
}

export function useProducts(
  category: Category | null,
  searchQuery: string
): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts(): Promise<void> {
      setLoading(true);
      setError(null);

      try {
        let result: Product[];

        if (searchQuery.trim()) {
          result = await searchProducts(searchQuery.trim());
        } else if (category) {
          result = await fetchProductsByCategory(category);
        } else {
          result = await fetchProducts();
        }

        if (!cancelled) {
          setProducts(result);
        }
      } catch (err) {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : 'Failed to load products';
          setError(message);
          setProducts([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    const debounceTimer = setTimeout(() => {
      void loadProducts();
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(debounceTimer);
    };
  }, [category, searchQuery]);

  const isEmpty =
    !loading && !error && searchQuery.trim() !== '' && products.length === 0;

  return { products, loading, error, isEmpty };
}
