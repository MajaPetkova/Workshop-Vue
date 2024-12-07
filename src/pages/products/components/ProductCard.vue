<script>
import { useFavoritesStore } from '../../../stores/useFavoritesStore';

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return { favoriteStore: useFavoritesStore () };
  },
  computed: {
    isFavorite() {
      return this.favoriteStore.isFavorite(this.product.id);
    },
  },
};
</script>

<template>
  <article>
    <img :src="product.images[0]" :alt="product.title">
    <h2>{{ product.title }}</h2>
    <p>
      {{ product.description }}
    </p>
    <p><b>Price</b>: {{ product.price }}$</p>
    <footer>
      <button class="secondary outline" type="button">
        Add to cart 🛒
      </button>
      <button type="button" class="contrast" :class="isFavorite ? '' : 'outline'" @click="favoriteStore.toggleFavorite(product.id)">
        Favorite {{ isFavorite ? '💙' : '🤍' }}
      </button>
    </footer>
  </article>
</template>
