import type { RouteRecordRaw } from 'vue-router';
import { nanoid } from 'nanoid';
import type { VNodeChild } from 'vue';

export function createRoutesWithLayout(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  function setupLayout(routes: RouteRecordRaw[]) {
    return routes.map((route) => {
      if (route.children && route.children.length > 0) {
        route.children = setupLayout(route.children);
      }

      if (route.meta && route.meta.layout) {
        const { layout } = route.meta;
        const record: RouteRecordRaw = {
          path: route.path,
          component: layout,
          children: [{ ...route, path: '' }],
          meta: {
            isLayout: true,
          },
        };

        if (route.children?.length && !route.redirect) {
          record.redirect = route.children[0].path;
        }

        return record;
      }

      return route;
    });
  }
  return setupLayout(routes);
}

interface Menu {
  key: string;
  title: string;
  path: string;
  icon?: () => VNodeChild;
  children?: Menu[];
}

export function createMenuFromRoutes(routes: RouteRecordRaw[]) {
  const menus: Menu[] = [];

  routes.forEach((route) => {
    if (!route.meta?.hiddenInMenu) {
      const menu: Menu = {
        key: nanoid(),
        path: route.path,
        title: route.meta?.title || '',
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
