import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { getProductsByIds } from '../services/products';

export const useFavoritesStore = defineStore('favoritesStore', () => {
  const favorites = ref (new Set([]));
  const products = ref([]);
  const isLoading = ref(false);

  const favoritesProducts = computed(() =>
    products.value.filter(x => favorites.value.has(x.id)),
  );

  function isFavorite(id) {
    return favorites.value.has(id);
  }

  function toggleFavorite(id) {
    const isFavorite = this.isFavorite(id);
    if (isFavorite) {
      favorites.value.delete(id);
    }
    else {
      favorites.value.add(id);
    }
  }
  async function loadFavorites() {
    isLoading.value = true;
    const response = await getProductsByIds(Array.from(favorites.value));
    products.value = response;
    isLoading.value = false;
  }
  function resetProducts() {
    products.value = [];
  }

  return { favoritesProducts, isFavorite, loadFavorites, resetProducts, toggleFavorite, isLoading };
});

// export const useFavoritesStore = defineStore('favoritesStore', {

//   state: () => ({
//     favorites: new Set([]),
//     products: [],
//     isLoading: false,
//   }),
//   getters: {
//     favoritesProducts: state => state.products.filter(x => state.favorites.has(x.id)),
//   },
//   actions: {
//     isFavorite(id) {
//       return this.favorites.has(id);
//     },
//     toggleFavorite(id) {
//       const isFavorite = this.isFavorite(id);
//       if (isFavorite) {
//         this.favorites.delete(id);
//       }
//       else {
//         this.favorites.add(id);
//       }
//     },
//     async loadFavorites() {
//       this.isLoading = true;
//       const response = await getProductsByIds(Array.from(this.favorites));
//       this.products = response;
//       this.isLoading = false;
//     },
//     resetProducts() {
//       this.products = [];
//     },
//   },
// });
