import { defineStore } from 'pinia';

export const useCardStore = defineStore('cartStore', {
  state() {
    return {
      products: new Map(),
    };
  },
  actions: {
    addToCard(product) {
      if (this.products.has(product.id)) {
        const prod = this.products.get(product.id);
        if (prod) {
          prod.quantity += 1;
        }
      }
      else {
        this.products.set(product.id, {
          id: product.id,
          quantity: 1,
        });
      }
      console.log(this.products);
    },
    changeQuantity(productId, type) {
      const prod = this.products.get(productId);
      if (!prod)
        return;
      if (type === 'increment') {
        prod.quantity += 1;
      }
      else {
        if (prod.quantity > 1) {
          prod.quantity -= 1;
        }
        else {
          this.removeFromCard(productId);
        }
      }
    },
    removeFromCard(productId) {
      this.products.delete(productId);
    },
  },
});
