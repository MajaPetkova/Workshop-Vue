import { defineStore } from 'pinia';

export const useFavoritesStore = defineStore('favoritesStore', {

  state: () => ({
    favorites: new Set([]),
  }),
  actions: {
    // addFavorites(id) {
    //   this.favorites.add(id);
    // },
    // removeFavorite(id) {
    //   this.favorites.delete(id);
    // },
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
  },
});
