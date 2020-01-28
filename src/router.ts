import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);
export const routes: any[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
    icon: 'home',
    menu: true,
  },
  {
    path: '/users',
    name: 'users',
    icon: 'users',
    menu: true,
    component: () => import(/* webpackChunkName: "about" */ './views/users/Users.vue'),
  },
  {
    path: '/users/new',
    name: 'usersFormNew',
    menu: false,
    component: () => import(/* webpackChunkName: "about" */ './views/users/UsersForm.vue'),
  }, {
    path: '/users/:id',
    name: 'usersFormEdit',
    menu: false,
    component: () => import(/* webpackChunkName: "about" */ './views/users/UsersForm.vue'),
  },
];
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
