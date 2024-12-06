<script>
import { getAllCategories } from '../../../services/categories';

// import { categories } from '../../../constants/categories';

export default {
  props: {
    active: {
      type: String,
      required: true,
    },
  },
  emits: ['select'],
  data() {
    return {
      categories: [],
      isLoading: true,
    };
  },
  async created() {
    // const res = await getAllCategories();
    // console.log(res);
    this.categories = await getAllCategories();
    this.isLoading = false;
  },

};
</script>

<template>
  <progress v-if="isLoading" />
  <ul v-else-if="categories.length > 0" role="list" class="categories">
    <li v-for="category in categories" :key="`category-btn-${category.value}`">
      <button :class="[category.slug === active ? 'primary' : 'secondary outline']" @click="$emit('select', category.slug)">
        {{ category.name }}
      </button>
    </li>
  </ul>
</template>

<style scoped>
.categories {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 1rem 2rem;
}
</style>
