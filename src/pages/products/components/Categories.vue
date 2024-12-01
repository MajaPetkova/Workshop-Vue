<script>
import { categories } from '../../../constants/categories';

export default {
  data() {
    return {
      categories,
      activeValue: '',

    };
  },
  methods: {
    onSelect(value) {
      this.activeValue = this.activeValue === value ? '' : value;
    },
  },
};
</script>

<template>
  <ul role="list" class="categories">
    <li v-for="category in categories" :key="`category-btn-${category.value}`">
      <button :class="[category.value === activeValue ? 'primary' : 'secondary outline']" @click="onSelect(category.value)">
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
}
</style>
