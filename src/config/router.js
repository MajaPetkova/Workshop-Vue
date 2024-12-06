import { createRouter, createWebHistory } from 'vue-router';
import About from '../pages/About.vue';
import Cart from '../pages/Cart.vue';
import Contacts from '../pages/Contacts.vue';
import Home from '../pages/Home.vue';
import Products from '../pages/products/Products.vue';
import Register from '../pages/register/components/Register.vue';

const routes = [{
  path: '/',
  component: Home,
}, {
  path: '/about',
  component: About,
}, {
  path: '/products',
  component: Products,
}, {
  path: '/contacts',
  component: Contacts,
}, {
  path: '/register',
  component: Register,
}, {
  path: '/cart',
  component: Cart,
}];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
