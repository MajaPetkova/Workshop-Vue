<script>
export default {
  data() {
    return {
      links: [{
        path: '/',
        name: 'Home',
      }, {
        path: '/about',
        name: 'About',
      }, {
        path: '/products',
        name: 'Products',
      }, {
        path: '/register',
        name: 'Register',
      }, {
        path: '/contacts',
        name: 'Contacts',
      }],

    };
  },
  methods: {
    onCartClick() {
      this.$router.push({ path: '/cart' });
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
          <router-link :to="{ path: link.path }">
            {{ link.name }}
          </router-link>
        </li>

        <button type="button" class="primary" @click="onCartClick">
          Cart
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
