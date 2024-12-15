<script>
import { useCardStore } from '../stores/useCartStore';
import { useUserStore } from '../stores/useUserStore';

export default {
  setup() {
    return {
      userStore: useUserStore(),
      cardStore: useCardStore(),
    };
  },
  data() {
    return {
      links: [{
        label: 'Home',
        name: 'home',
      }, {
        label: 'About',
        name: 'about',
      }, {
        label: 'Products',
        name: 'products',
      }, {
        name: 'register',
        label: 'Register',
      }, {
        label: 'Contacts',
        name: 'contacts',
      }, { label: 'Favorites', name: 'favorites' }, { label: 'Login', name: 'login' }],

    };
  },
  computed: {
    userName() { return this.userStore.user?.username ?? ''; },
    cartLength() { return this.cardStore.products.size; },
  },
  async created() {
    await this.userStore.reAuthUser();
  },
  methods: {
    onCartClick() {
      this.$router.push({ name: 'cart' });
    },
  },
};
</script>

<template>
  <header>
    <nav>
      <ul>
        <li>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4Q0hUaUi7lLLC5UOslM9ul_B8NyXTKNn9BcBGtCXV&s"
            alt="logo"
          >
        </li>
      </ul>
      <ul>
        <li v-for="link in links" :key="link.path">
          <router-link :to="{ name: link.name }">
            {{ link.label }}
          </router-link>
        </li>

        <button type="button" class="primary" @click="onCartClick">
          Cart <span v-if="cartLength">{{ cartLength }}</span>
        </button>
        <button type="button" class="outline">
          {{ userName }}
        </button>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
nav {
  padding: 0.25rem 1rem;
}

nav img {
  height: 2rem;
}
</style>
