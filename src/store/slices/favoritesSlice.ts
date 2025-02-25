import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

interface FavoritesState {
  items: { [key: string]: FavoriteItem };
}

const initialState: FavoritesState = {
  items: {},
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      const item = action.payload;
      if (state.items[item.id]) {
        delete state.items[item.id];
      } else {
        state.items[item.id] = item;
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export const selectFavorites = (state: { favorites: FavoritesState }) => state.favorites.items;
export const selectIsFavorite = (id: string) => (state: { favorites: FavoritesState }) => 
  Boolean(state.favorites.items[id]);

export default favoritesSlice.reducer;
