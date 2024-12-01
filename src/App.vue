<script>
import AppFooter from './components/AppFooter.vue';
import AppHeader from './components/AppHeader.vue';
// import ComponentsStarter from './components/ComponentsStarter.vue';
import Products from './pages/Products.vue';

export default {
  components: {
    AppHeader,
    AppFooter,
    // ComponentsStarter,
    Products,
  },
};
</script>

<template>
  <AppHeader />
  <main>
    <!-- <ComponentsStarter /> -->
    <Products />
  </main>
  <AppFooter />
</template>
