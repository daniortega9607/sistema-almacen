import Vue from 'vue';
import Router from 'vue-router';
import App from './App.vue';

Vue.use(Router);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/Login.vue'),
  },
  {
    path: '/admin-panel',
    name: 'admin-panel',
    component: () => import('./views/Admin.vue'),
    meta: {
      requiresSuperadmin: true,
    },
  },
  {
    path: '/',
    component: App,
    children: [
      { path: '', component: () => import('./views/Home.vue') },
      { path: 'home', component: () => import('./views/Home.vue') },
      { path: 'ajustes', component: () => import('./views/Settings.vue') },
      { path: 'almacen', component: () => import('./views/Stock.vue') },
      //{ path: 'movimientos-almacen', component: () => import('./views/StockMovement.vue') },
      { path: ':entity', component: () => import('./components/Entity.vue') },
    ],
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new Router({ mode: 'history', base: process.env.BASE_URL, routes });

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresSuperadmin)) {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.user) : null;
    if (user && user.superadmin) {
      next();
    } else if (user) {
      next('/');
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    }
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.user) : null;
    if (user) {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    }
  } else next();
});

export default router;
