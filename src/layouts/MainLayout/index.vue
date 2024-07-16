<script lang="ts" setup>
import { computed, h } from 'vue';
import type { MenuOption } from 'naive-ui/es/menu/src/interface';
import { RouterLink, useRoute } from 'vue-router';
import { RiVuejsFill } from '@remixicon/vue';
import type { MenuProps } from 'naive-ui';
import { type Menu, createMenuFromRoutes, routes } from '~/routes';
import { useTheme } from '~/theme';
import { renderIcon } from '~/utils';

defineOptions({ name: 'MainLayout', inheritAttrs: false });

const { token, mode } = useTheme();
const route = useRoute();

const menus = computed(() => transformToMenuOptions(createMenuFromRoutes(routes)));
const cssVars = computed(() => {
  return {
    '--content-bg': token.value.bodyColor,
    '--sidebar-bg': mode.value === 'dark' ? '#202427' : '#121621',
    '--appbar-bg': mode.value === 'dark' ? '#1c1c1c' : '#fff',
    '--sidebar-width': '280px',
  };
});
const selectedKey = computed(() => {
  const { hiddenInMenu, activeMenu } = route.meta;
  const name = route.name as string;

  return (hiddenInMenu ? activeMenu : name) || name;
});
const menuThemeOverrides = computed<MenuProps['themeOverrides']>(() => {
  if (mode.value === 'dark') {
    return {
      itemColorHoverInverted: '#292d2f',
      itemTextColorActiveInverted: 'rgb(51, 54, 57)',
      itemTextColorActiveHoverInverted: 'rgb(51, 54, 57)',
      itemIconColorActiveInverted: 'rgb(51, 54, 57)',
      itemIconColorActiveHoverInverted: 'rgb(51, 54, 57)',
    };
  }
  return {
    itemColorHoverInverted: '#1b1f2a',
  };
});

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
        ? renderIcon(menu.icon)
        : undefined,
    } as MenuOption;
    if (menu.children?.length) {
      option.children = transformToMenuOptions(menu.children);
    }
    options.push(option);
  });

  return options;
}
</script>

<template>
  <div class="flex-col flex-auto" :style="cssVars">
    <div class="fixed top-0 left-0 w-[--sidebar-width] bg-[--sidebar-bg] h-full flex-col">
      <div class="color-white text-32px m-16px flex-cross-center gap-8px">
        <NIcon :color="token.primaryColor">
          <RiVuejsFill />
        </NIcon>
        汪小明
      </div>
      <nav class="flex-auto overflow-y-auto" style="scrollbar-width: none;">
        <NMenu
          inverted
          :options="menus"
          :value="selectedKey"
          :theme-overrides="menuThemeOverrides"
        />
      </nav>
    </div>
    <main class="flex-auto flex-col pl-[--sidebar-width] bg-[--content-bg]">
      <header class="sticky h-56px top-0 left-0 w-full border-b-solid bg-[--appbar-bg]" />
      <RouterView />
    </main>
  </div>
</template>
