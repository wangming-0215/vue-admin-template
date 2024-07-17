import type { RouteRecordRaw } from 'vue-router';
import type { Menu } from './typings';

export function createRoutesWithLayout(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  function setupLayout(routes: RouteRecordRaw[]) {
    return routes.map((route) => {
      if (route.children && route.children.length > 0) {
        route.children = setupLayout(route.children);
      }

      if (route.meta && route.meta.layout) {
        const { layout } = route.meta;
        const childRoute = { ...route, path: '' } as RouteRecordRaw;
        if (route.children?.length && !route.redirect) {
          childRoute.redirect = route.children[0].path;
        }
        return {
          path: route.path,
          component: layout,
          children: [childRoute],
          meta: {
            isLayout: true,
          },
        };
      }

      return route;
    });
  }
  return setupLayout(routes);
}

export function createMenuFromRoutes(routes: RouteRecordRaw[]) {
  const menus: Menu[] = [];

  routes.forEach((route) => {
    if (!route.meta?.hiddenInMenu) {
      const menu: Menu = {
        key: route.name as string,
        path: route.path,
        label: route.meta?.title || '',
        icon: route.meta?.icon,
      };
      if (route.children?.some(child => !child.meta?.hiddenInMenu)) {
        menu.children = createMenuFromRoutes(route.children);
      }

      menus.push(menu);
    }
  });

  return menus;
}
