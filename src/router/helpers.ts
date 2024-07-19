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

// const expandedKeys = ref<string[]>([]);

// watch(
//   () => route.name,
//   () => {
//     updateExpandedKeys();
//   },
//   { immediate: true },
// );

// function updateExpandedKeys() {
//   if (!selectedKey.value) {
//     expandedKeys.value = [];
//     return;
//   }
//   expandedKeys.value = getSelectedMenuKeys(selectedKey.value, menus.value);
// }

// /**
//  * 获取当前选中菜单的父子菜单 key
//  * @param selectedKey
//  * @param menus
//  */
// function getSelectedMenuKeys(selectedKey: string, menus: Menu[]) {
//   const keys: string[] = [];

//   menus.some((menu) => {
//     const path = findMenuPath(selectedKey, menu);

//     if (path) {
//       keys.push(...path);
//     }

//     return !!path?.length;
//   });

//   return keys;
// }

// /**
//  * 深度优先搜索
//  * @param targetKey
//  * @param menu
//  */
// function findMenuPath(targetKey: string, menu: Menu) {
//   const path: string[] = [];

//   function dfs(item: Menu): boolean {
//     path.push(item.key);

//     if (item.key === targetKey) {
//       return true;
//     }

//     if (item.children) {
//       for (const child of item.children) {
//         if (dfs(child)) {
//           return true;
//         }
//       }
//     }

//     path.pop();

//     return false;
//   }

//   if (dfs(menu)) {
//     return path;
//   }

//   return null;
// }
