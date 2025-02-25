import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  imageUrl: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  shipping: number;
  tax: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
  shipping: 10,
  tax: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        item => 
          item.id === action.payload.id && 
          item.size === action.payload.size && 
          item.color === action.payload.color
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      state.tax = state.total * 0.16; // 16% de impuesto
    },
    removeItem: (state, action: PayloadAction<{ id: string; size: string; color: string }>) => {
      state.items = state.items.filter(
        item => 
          !(item.id === action.payload.id && 
            item.size === action.payload.size && 
            item.color === action.payload.color)
      );
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      state.tax = state.total * 0.16;
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; size: string; color: string; quantity: number }>
    ) => {
      const item = state.items.find(
        item => 
          item.id === action.payload.id && 
          item.size === action.payload.size && 
          item.color === action.payload.color
      );
      if (item) {
        item.quantity = action.payload.quantity;
        state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        state.tax = state.total * 0.16;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.tax = 0;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
