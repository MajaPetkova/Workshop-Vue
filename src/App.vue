<script>
import AppFooter from './components/AppFooter.vue';
import AppHeader from './components/AppHeader.vue';

export default {
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<template>
  <Suspense>
    <AppHeader />
    <template #fallback>
      <h2>Loading...</h2>
    </template>
  </Suspense>
  <main>
    <!-- <component :is="page" /> -->
    <router-view />
  </main>
  <AppFooter />
</template>
