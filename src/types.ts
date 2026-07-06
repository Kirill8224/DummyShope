export type Category = 'groceries' | 'fragrances' | 'beauty';

export const CATEGORIES: readonly Category[] = [
  'groceries',
  'fragrances',
  'beauty',
] as const;

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
  minimumOrderQuantity: number;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Company {
  title: string;
  name: string;
  department: string;
  address: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  company: Company;
}

export interface UsersResponse {
  users: Employee[];
  total: number;
  skip: number;
  limit: number;
}

export interface ApiError {
  message: string;
}
