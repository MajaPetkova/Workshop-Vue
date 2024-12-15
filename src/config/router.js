import { createRouter, createWebHistory } from 'vue-router';
import About from '../pages/About.vue';
import Cart from '../pages/cart/Cart.vue';
import Contacts from '../pages/Contacts.vue';
import Favorites from '../pages/Favorites.vue';
import Home from '../pages/Home.vue';
import Login from '../pages/login/Login.vue';
import SingleProduct from '../pages/products/components/SingleProduct.vue';
import Products from '../pages/products/Products.vue';
import Register from '../pages/register/components/Register.vue';
import { useUserStore } from '../stores/useUserStore';

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
}, {
  path: '/login',
  name: 'login',
  component: Login,
  beforeEnter: async () => {
    const store = useUserStore();
    if (store.user) {
      return false;
    }

    const isLogged = await store.reAuthUser();
    if (isLogged) {
      return false;
    }
  },
}, { path: '/product/:id', name: 'singleProduct', component: SingleProduct }, {
  path: '/favorites',
  name: 'favorites',

  component: Favorites,
  beforeEnter: async () => {
    const store = useUserStore();
    if (!store.user) {
      const isLogged = await store.reAuthUser();
      if (!isLogged) {
        return { name: 'login' };
      }
    }
  },
}];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from) => {
//   console.log('before the routing', to, from);
// });
export default router;
