import type { App, Component, DefineComponent } from 'vue';
import type { RouteRecordInfo } from 'vue-router';
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
  });

  app.use(router);
  await router.isReady();
}

export * from './helpers';
export * from './typings';
export { routes };

declare module 'vue-router' {
  export interface RouteMeta {
    title?: string;
    requiresAuth?: boolean;
    layout?: () => Promise<Component | DefineComponent>;
    /** 在菜单中隐藏 */
    hiddenInMenu?: boolean;
    /** 高亮 */
    activeMenu?: string;
    /** 菜单 icon */
    icon?: string;
  }

  export interface TypesConfig {
    RouteNamedMap: RouteNamedMap;
  }
}

export interface RouteNamedMap {
  '/': RouteRecordInfo<
    '/',
    '/',
    Record<never, never>,
    Record<never, never>
  >;
  '/form/basic': RouteRecordInfo<
    '/form/basic',
    '/form/basic',
    Record<never, never>,
    Record<never, never>
  >;
}
