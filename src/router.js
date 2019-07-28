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
      path: '/login',
      name: 'login',
      component: () => import('./components/login/login'),
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('./components/detail/detail'),
    },
    {
      path: '/position',
      name: 'position',
      component: () => import('./components/position/position'),
    },
    {
      path: '/record',
      name: 'record',
      component: () => import('./components/record/record'),
    },
    {
      path: '/profit',
      name: 'profit',
      component: () => import('./components/profit/profit'),
    },
    {
      path: '/userinfo',
      name: 'userinfo',
      component: () => import('./components/userinfo/userinfo'),
    },
    {
      path: '/mall',
      name: 'mall',
      component: () => import('./components/mall/mall'),
    },
    { path: '*', redirect: '/' },
  ],
});
