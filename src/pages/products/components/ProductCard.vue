<script>
import { useCardStore } from '../../../stores/useCartStore';
import { useFavoritesStore } from '../../../stores/useFavoritesStore';
import { useUserStore } from '../../../stores/useUserStore';

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return { favoriteStore: useFavoritesStore (), userStore: useUserStore(), cardStore: useCardStore() };
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
      <button class="secondary outline" type="button" @click="cardStore.addToCard(product)">
        Add to cart 🛒
      </button>
      <button v-if="userStore.isUserLogged" type="button" class="contrast" :class="isFavorite ? '' : 'outline'" @click="favoriteStore.toggleFavorite(product.id)">
        Favorite {{ isFavorite ? '💙' : '🤍' }}
      </button>
    </footer>
  </article>
</template>
