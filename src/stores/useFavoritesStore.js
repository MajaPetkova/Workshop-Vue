import { defineStore } from 'pinia';
import { getProductsByIds } from '../services/products';

export const useFavoritesStore = defineStore('favoritesStore', {

  state: () => ({
    favorites: new Set([]),
    products: [],
    isLoading: false,
  }),
  getters: {
    favoritesProducts: state => state.products.filter(x => state.favorites.has(x.id)),
  },
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
    resetProducts() {
      this.products = [];
    },
  },
});
