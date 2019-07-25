import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/home/home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./components/login/login'),
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('./components/detail/detail'),
    },
    { path: '*', redirect: '/' },
  ],
});
