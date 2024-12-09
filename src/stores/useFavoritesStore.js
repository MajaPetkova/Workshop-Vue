import { defineStore } from 'pinia';
import { getProductsByIds } from '../services/products';

export const useFavoritesStore = defineStore('favoritesStore', {

  state: () => ({
    favorites: new Set([1, 2, 6]),
    products: [],
    isLoading: false,
  }),
  actions: {
    isFavorite(id) {
      return this.favorites.has(id);
    },
    toggleFavorite(id) {
      const isFavorite = this.isFavorite(id);
      if (isFavorite) {
        this.favorites.delete(id);
      }
      else {
        this.favorites.add(id);
      }
    },
    async loadFavorites() {
      this.isLoading = true;
      const response = await getProductsByIds(Array.from(this.favorites));
      this.products = response;
      this.isLoading = false;
    },
  },
});
