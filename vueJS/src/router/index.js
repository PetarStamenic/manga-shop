import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Single from '@/views/Single.vue';
import Cart from '@/views/Cart.vue';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import Search from "@/views/Search.vue";
import Category from "@/views/Category.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: Category
  },
  {
    path: '/single/:id',
    name: 'Single',
    component: Single
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
