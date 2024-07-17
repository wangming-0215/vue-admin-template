<script lang="ts" setup>
import { computed, h, ref } from 'vue';
import type { MenuOption } from 'naive-ui/es/menu/src/interface';
import { RouterLink, useRoute } from 'vue-router';
import {
  RiMenuFold3Line,
  RiMenuUnfold3Line,
  RiMoonLine,
  RiSunLine,
  RiVuejsFill,
} from '@remixicon/vue';
import { type Menu, menus } from '~/routes';
import { useTheme } from '~/theme';
import { getAssetUrl, renderIcon } from '~/utils';
import { useAppStore } from '~/store/modules/app';

defineOptions({ name: 'MainLayout', inheritAttrs: false });

const collapsedWidth = 64;

const route = useRoute();
const { token, mode } = useTheme();
const appStore = useAppStore();
const collapsed = ref<boolean>(false);
const options = computed(() => transformToMenuOptions(menus));
const cssVars = computed(() => {
  return {
    '--content-bg': token.value.bodyColor,
    '--sidebar-bg': mode.value === 'dark' ? '#121517' : '#f9fafb',
    '--appbar-bg': mode.value === 'dark' ? token.value.bodyColor : '#fff',
    '--sidebar-width': collapsed.value ? `${collapsedWidth + 16}px` : '280px',
  };
});
const selectedKey = computed(() => {
  const { hiddenInMenu, activeMenu } = route.meta;
  const name = route.name as string;

  return (hiddenInMenu ? activeMenu : name) || name;
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
</script>

<template>
  <div class="flex-col flex-auto bg-[--content-bg]" :style="cssVars">
    <div class="fixed top-0 left-0 w-[--sidebar-width] bg-[--sidebar-bg] h-full max-lg:hidden lg:flex-col border-r-solid z-1000 transition-all">
      <div class="text-24px p-16px flex-center gap-8px">
        <NIcon :color="token.primaryColor" :size="48">
          <RiVuejsFill />
        </NIcon>
      </div>
      <nav class="flex-auto overflow-y-auto py-16px px-8px" style="scrollbar-width: none;">
        <NMenu
          :options
          :value="selectedKey"
          :indent="18"
          :collapsed
          :collapsed-width="64"
        />
      </nav>
    </div>
    <div class="flex-auto flex-col lg:pl-[--sidebar-width] transition-all">
      <header class="sticky top-0 left-0 w-full  bg-[--appbar-bg]">
        <div class="min-h-56px px-16px lg:px-24px py-8px flex flex-cross-center border-b-solid gap-x-16px">
          <NButton quaternary class="w-40px h-40px" @click="collapsed = !collapsed">
            <template #icon>
              <NIcon :size="24">
                <RiMenuFold3Line v-if="!collapsed" />
                <RiMenuUnfold3Line v-if="collapsed" />
              </NIcon>
            </template>
          </NButton>
          <div class="flex-auto" />
          <NButton quaternary class="w-40px h-40px" @click="appStore.toggleThemeMode">
            <template #icon>
              <NIcon :size="24">
                <RiSunLine v-if="mode === 'light'" />
                <RiMoonLine v-if="mode === 'dark'" />
              </NIcon>
            </template>
          </NButton>
          <NAvatar :size="40" round :src="getAssetUrl('avatar.png')" />
        </div>
      </header>
      <main class="flex-auto flex-col">
        <div class="max-w-1440px mx-auto my-0 p-16px lg:p-24px w-full">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>
