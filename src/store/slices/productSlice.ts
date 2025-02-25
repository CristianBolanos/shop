import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { products } from '../../data/products';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  subcategory: string;
  sizes: string[];
  colors: string[];
  stock: number;
  rating: number;
  isNew?: boolean;
  discount?: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  loading: boolean;
  error: string | null;
  filters: {
    category: string | null;
    minPrice: number | null;
    maxPrice: number | null;
    sortBy: 'price-asc' | 'price-desc' | 'rating' | null;
    searchQuery: string;
  };
}

const initialState: ProductsState = {
  items: products,
  filteredItems: products,
  loading: false,
  error: null,
  filters: {
    category: null,
    minPrice: 0,
    maxPrice: 10000,
    sortBy: null,
    searchQuery: '',
  },
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action: PayloadAction<Product[]>) => {
      state.loading = false;
      state.items = action.payload;
      state.filteredItems = action.payload;
    },
    fetchProductsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<ProductsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredItems = state.items.filter((product) => {
        const categoryMatch = !state.filters.category || product.category === state.filters.category;
        const priceMatch =
          (!state.filters.minPrice || product.price >= state.filters.minPrice) &&
          (!state.filters.maxPrice || product.price <= state.filters.maxPrice);

        return categoryMatch && priceMatch;
      });

      if (state.filters.sortBy) {
        state.filteredItems.sort((a, b) => {
          switch (state.filters.sortBy) {
            case 'price-asc':
              return a.price - b.price;
            case 'price-desc':
              return b.price - a.price;
            case 'rating':
              return b.rating - a.rating;
            default:
              return 0;
          }
        });
      }
    },
    addReview: (
      state,
      action: PayloadAction<{ productId: string; review: Review }>
    ) => {
      const product = state.items.find((p) => p.id === action.payload.productId);
      if (product) {
        product.reviews.push(action.payload.review);
        product.rating =
          product.reviews.reduce((sum, review) => sum + review.rating, 0) /
          product.reviews.length;
      }
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  setFilters,
  addReview,
} = productSlice.actions;
export default productSlice.reducer;
