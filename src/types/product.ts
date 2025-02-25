export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  isNew: boolean;
  discount: number;
  rating: number;
  category: string;
  subcategory: string;
  sizes: string[];
  colors: string[];
}
