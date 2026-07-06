import type {
  Category,
  Employee,
  Product,
  ProductsResponse,
  UsersResponse,
} from '../types';

const BASE_URL = 'https://dummyjson.com';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export async function fetchProducts(): Promise<Product[]> {
  const data = await handleResponse<ProductsResponse>(
    await fetch(`${BASE_URL}/products`)
  );
  return data.products;
}

export async function fetchProductById(id: number): Promise<Product> {
  return handleResponse<Product>(await fetch(`${BASE_URL}/products/${id}`));
}

export async function fetchProductsByCategory(
  category: Category
): Promise<Product[]> {
  const data = await handleResponse<ProductsResponse>(
    await fetch(`${BASE_URL}/products/category/${category}`)
  );
  return data.products;
}

export async function searchProducts(query: string): Promise<Product[]> {
  const data = await handleResponse<ProductsResponse>(
    await fetch(`${BASE_URL}/products/search?q=${encodeURIComponent(query)}`)
  );
  return data.products;
}

export async function fetchEmployees(): Promise<Employee[]> {
  const data = await handleResponse<UsersResponse>(
    await fetch(`${BASE_URL}/users`)
  );
  return data.users;
}
