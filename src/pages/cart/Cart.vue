<script>
import { getProductsByIds } from '../../services/products';
import { useCardStore } from '../../stores/useCartStore';
import CartTableRow from './CartTableRow.vue';

export default {
  components: {
    CartTableRow,
  },
  setup() {
    return { cartStore: useCardStore() };
  },
  data() {
    return { products: [], isLoading: true };
  },
  async created() {
    const response = await getProductsByIds(Array.from(this.cartStore.products.keys()));
    this.products = response;
    this.isLoading = false;
    // console.log(Array.from(this.cartStore.products.keys()));
  },
};
</script>

<template>
  <main>
    <h1 style="text-align: center;">
      Cart
    </h1>
    <div class="container">
      <progress v-if="isLoading" />
      <article v-else-if="products.length">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <CartTableRow v-for="product in products" :key="product.id" :product="product" />
          </tbody>
        </table>
      </article>
    </div>
  </main>
</template>
