import type { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createMenuFromRoutes, createRoutesWithLayout } from './helpers';
import { routes } from './routes';

window.console.log('routes: ', createRoutesWithLayout(routes));

window.console.log('menus: ', createMenuFromRoutes(routes));

export async function setupRouter(app: App) {
  const router = createRouter({
    history: createWebHistory('/'),
    routes: createRoutesWithLayout(routes),
  });

  app.use(router);
  await router.isReady();
}

export * from './helpers';
export * from './types';
export { routes };
