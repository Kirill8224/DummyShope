import { useEffect, useState } from 'react';
import { fetchEmployees } from '../Api/api';
import type { Employee } from '../types';

interface UseEmployeesResult {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

export function useEmployees(): UseEmployeesResult {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadEmployees(): Promise<void> {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchEmployees();
        if (!cancelled) {
          setEmployees(result);
        }
      } catch (err) {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : 'Failed to load employees';
          setError(message);
          setEmployees([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadEmployees();

    return () => {
      cancelled = true;
    };
  }, []);

  return { employees, loading, error };
}
