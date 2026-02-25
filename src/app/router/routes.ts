import { ROUTE_NAMES } from 'src/shared/app/model';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: ROUTE_NAMES.MAIN,
    component: () => import('src/pages/main/main-page.vue'),
  },
  {
    path: '/login',
    name: ROUTE_NAMES.LOGIN,
    component: () => import('src/pages/login/index-page.vue'),
  },
  {
    path: '/signup',
    name: ROUTE_NAMES.SIGNUP,
    component: () => import('src/pages/signup/index-page.vue'),
  },
  {
    path: '/account',
    name: ROUTE_NAMES.ACCOUNT,
    component: () => import('src/pages/account/index-page.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/projects',
    name: ROUTE_NAMES.PROJECTS,
    component: () => import('src/pages/projects/index-page.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
