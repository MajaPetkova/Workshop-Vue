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
  computed: {
    totalPrice() {
      const total = this.products.reduce((accumulator, prod) => {
        return accumulator + prod.price * (this.cartStore.products.get(prod.id)?.quantity ?? 0);
      }, 0);
      return Math.round((total + Number.EPSILON) * 100) / 100;
    },
  },
  async created() {
    const response = await getProductsByIds(Array.from(this.cartStore.products.keys()));
    this.products = response;
    this.isLoading = false;
    // console.log(Array.from(this.cartStore.products.keys()));
  },
  methods: {
    onDelete(productId) {
      this.products = this.products.filter(x => x.id !== productId);
      this.cartStore.removeFromCard(productId);
    },
  },
};
</script>

<template>
  <main>
    <h1 style="text-align: center;">
      Cart
    </h1>
    <div class="pageContainer">
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
            <CartTableRow v-for="product in products" :key="product.id" :product="product" @delete="onDelete(product.id)" />
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3">
                Total:
              </td>
              <td class="price">
                ${{ totalPrice }}
              </td>
            </tr>
          </tfoot>
        </table>
      </article>
    </div>
  </main>
</template>

<style scoped>
.pageContainer{
padding: 1rem;
display: flex;
align-items: center;
justify-content: center;
}
article{
  width: 740px;
}
</style>
