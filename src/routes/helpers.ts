import type { RouteRecordRaw } from 'vue-router';
import { nanoid } from 'nanoid';
import type { Menu, Route } from './types';

export function createRoutesWithLayout(routes: Route[]): RouteRecordRaw[] {
  function setupLayout(routes: Route[], top = false) {
    return routes.map((route) => {
      if (route.children && route.children.length > 0) {
        route.children = setupLayout(route.children, false);
      }

      const { layout } = route.meta || {} as any;

      if (top) {
        if (route.meta?.layout !== false) {
          return {
            path: route.path,
            component: layout,
            children: route.path === '/' ? [route] : [{ ...route, path: '' }],
            meta: {
              isLayout: true,
            },
          } as unknown as RouteRecordRaw;
        }
      }

      if (route.meta?.layout) {
        return {
          path: route.path,
          component: layout,
          children: [{ ...route, path: '' }],
          meta: {
            isLayout: true,
          },
        } as unknown as RouteRecordRaw;
      }

      return route as RouteRecordRaw;
    });
  }

  return setupLayout(routes);
}

export function createMenuFromRoutes(routes: Route[]) {
  function traverse(routes: Route[], parentPath: string = ''): any {
    return routes.map((route) => {
      const path = [parentPath, route.path].filter(t => Boolean(t)).join('/');

      const menu: Menu = {
        key: nanoid(),
        path,
        title: route.meta?.title || '',
        icon: '',
      };

      if (route.children && route.children.length > 0) {
        menu.children = traverse(route.children, route.path);
      }

      return menu;
    });
  }

  return traverse(routes);
}
