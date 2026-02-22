import { defineRouter } from '#q-app/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';
import { ROUTE_NAMES } from 'src/shared/app/model';
import { useUserQuery } from 'src/entities/user/model/user.query';
import { accessToken } from 'src/shared/api/methods/token';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    const isAuthenticated = !!accessToken.value;

    if (to.meta.requiresAuth) {
      useUserQuery(() => !!accessToken.value);
      if (!isAuthenticated) {
        next({ name: ROUTE_NAMES.LOGIN });
        return;
      }
      next();
      return;
    }

    if (to.meta.guestOnly && !isAuthenticated) {
      next({ name: ROUTE_NAMES.MAIN });
      return;
    }

    next();
  });

  return Router;
});
