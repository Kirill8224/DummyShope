import { useEffect, useState } from 'react';
import { fetchProductById } from '../Api/api';
import type { Product } from '../types';

interface UseProductResult {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

export function useProduct(id: number): UseProductResult {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProduct(): Promise<void> {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchProductById(id);
        if (!cancelled) {
          setProduct(result);
        }
      } catch (err) {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : 'Failed to load product';
          setError(message);
          setProduct(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadProduct();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { product, loading, error };
}
