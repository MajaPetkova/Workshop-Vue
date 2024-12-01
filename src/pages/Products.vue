<script>
import { products } from '../constants/products';
import Categories from './products/components/Categories.vue';
import ProductCard from './products/components/ProductCard.vue';

export default {
  components: {
    Categories,
    ProductCard,
  },
  data() {
    return {
      products,
    };
  },
};
</script>

<template>
  <div>
    <Categories />
  </div>
  <div class="products">
    <ProductCard v-for="prod in products" :key="prod.title" :product="prod" />
  </div>
</template>

<style scoped>
.products {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}
</style>
