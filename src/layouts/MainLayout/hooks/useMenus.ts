import { computed, h } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import type { MenuOption } from 'naive-ui';

import { AppIcon } from '@/components';
import { type Menu, menus } from '@/router';

/**
 * 转成 naive ui menus 适配的 menu
 * @param menus
 */
function transformToMenuOptions(menus: Menu[]) {
  const options: MenuOption[] = [];

  menus.forEach((menu) => {
    const option = {
      ...menu,
      label: menu.children?.length
        ? menu.label
        : () => h(RouterLink, { to: menu.path }, { default: () => menu.label }),
      icon: menu.icon
        ? () => h(AppIcon, { icon: menu.icon! })
        : undefined,
    } as MenuOption;
    if (menu.children?.length) {
      option.children = transformToMenuOptions(menu.children);
    }
    options.push(option);
  });

  return options;
}

export default function useMenus() {
  const route = useRoute();
  const options = computed(() => transformToMenuOptions(menus));
  const selectedKey = computed(() => {
    const { hiddenInMenu, activeMenu } = route.meta;
    const name = route.name as string;
    return (hiddenInMenu ? activeMenu : name) || name;
  });

  return { menus: options, selectedKey };
}
