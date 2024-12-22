<script setup>
import { storeToRefs } from 'pinia';
import { onUnmounted } from 'vue';
import { useFavoritesStore } from '../stores/useFavoritesStore';
import ProductCard from './products/components/ProductCard.vue';

const favoritesStore = useFavoritesStore();
const { isLoading, favoritesProducts } = storeToRefs(favoritesStore);

favoritesStore.loadFavorites();
// this.isLoading = false;

onUnmounted(() => {
  favoritesStore.resetProducts();
});
</script>

<template>
  <progress v-if="isLoading" />
  <div v-else-if="favoritesProducts.length > 0" class="products">
    <ProductCard v-for="prod in favoritesStore.favoritesProducts" :key="prod.title + prod.id" :product="prod" />
  </div>
</template>

<style scoped>
.products {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}
</style>
