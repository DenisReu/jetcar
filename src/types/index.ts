export interface Product {
  id: string;
  slug: string;
  name: string;
  vendor: string;
  price: number;
  originalPrice?: number;
  currency: string;
  images: string[];
  category: string;
  collection: string;
  tags: string[];
  description: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  inStock: boolean;
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  inStock: boolean;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export interface NavChild {
  label: string;
  href: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  variant?: string;
}
