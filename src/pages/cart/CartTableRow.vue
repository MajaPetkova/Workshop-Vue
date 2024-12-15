<script>
export default {
  props: {
    product: {
      required: true,
      type: Object,
    },
  },
};
</script>

<template>
  <tr>
    <td>
      <div style="aspect-ratio: 1/1; width: 5rem; border-radius: 0.5rem; overflow: hidden;">
        <img
          style="object-fit: cover; width: 100%; height: 100%;"
          :src="product.images[0]" :alt="product.images.title"
        >
      </div>
    </td>
    <td>
      <p style="font-size: 1.25rem;">
        {{ product.images.title }}
      </p>
      <p style="font-size: 0.75rem;">
        Product price: {{ product.price }}$
      </p>
    </td>
    <td>
      <input type="number" value="2" style="width: 5rem;">
    </td>
    <td class="price">
      $70
    </td>    <td class="price">
      <button type="button" class="secondary outline">
        Remove 🗑️
      </button>
    </td>
  </tr>
</template>
