import { createRouter, createWebHistory } from 'vue-router';
import About from '../pages/About.vue';
import Cart from '../pages/Cart.vue';
import Contacts from '../pages/Contacts.vue';
import Home from '../pages/Home.vue';
import SingleProduct from '../pages/products/components/SingleProduct.vue';
import Products from '../pages/products/Products.vue';
import Register from '../pages/register/components/Register.vue';

const routes = [{
  path: '/',
  name: 'home',
  component: Home,
}, {
  path: '/about',
  name: 'about',
  component: About,
}, {
  path: '/products',
  name: 'products',
  component: Products,
}, {
  path: '/contacts',
  name: 'contacts',
  component: Contacts,
}, {
  path: '/register',
  name: 'register',
  component: Register,
}, {
  path: '/cart',
  name: 'cart',
  component: Cart,
}, { path: '/product/:id', name: 'singleProduct', component: SingleProduct }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
