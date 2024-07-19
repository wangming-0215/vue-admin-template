import type { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createMenuFromRoutes, createRoutesWithLayout } from './helpers';
import { routes } from './routes';

/**
 * 菜单
 */
export const menus = createMenuFromRoutes(routes);

/**
 * 设置路由
 * @param app
 */
export async function setupRouter(app: App) {
  const router = createRouter({
    history: createWebHistory('/'),
    routes: createRoutesWithLayout(routes),
    scrollBehavior: () => ({ left: 0, top: 0 }),
  });

  app.use(router);
  await router.isReady();
}

export * from './helpers';
export * from './typings';
export { routes };
