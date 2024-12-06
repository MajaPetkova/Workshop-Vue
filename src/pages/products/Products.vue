<script>
// import { products } from '../../constants/products';

import { getAllProducts, getProducts } from '../../services/products';
import Categories from './components/Categories.vue';
import ProductCard from './components/ProductCard.vue';

export default {
  components: {
    Categories,
    ProductCard,
  },
  data() {
    return {
      activeCategory: '',
      isLoading: true,
      products: [],
    };
  },
  // computed: {
  //   visibleProducts() {
  //     return this.activeCategory === '' ? this.products : this.products.filter(x => x.category === this.activeCategory);
  //   },
  // },
  async created() {
    this.products = await getAllProducts();
    this.isLoading = false;
  },

  methods: {
    async onSelect(value) {
      const category = this.activeCategory === value ? '' : value;
      this.activeCategory = category;

      await this.loadProducts(category);
    },
    async loadProducts(category = '') {
      this.isLoading = true;
      if (category) {
        this.products = await getProducts(category);
      }
      else {
        this.products = await getAllProducts();
      }
      this.isLoading = false;
    },
  },
};
</script>

<template>
  <div>
    <Categories :active="activeCategory" @select="onSelect" />
  </div>
  <progress v-if="isLoading" />
  <div v-else-if="products.length > 0" class="products">
    <ProductCard v-for="prod in products" :key="prod.title + prod.id" :product="prod" />
  </div>
</template>

<style scoped>
.products {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}
</style>
