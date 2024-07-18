<script lang="ts" setup>
import { computed, h, ref, watch } from 'vue';
import type { MenuOption } from 'naive-ui/es/menu/src/interface';
import { RouterLink, useRoute } from 'vue-router';
import { useMediaQuery } from '@vueuse/core';
import { type Menu, menus } from '~/routes';
import { useTheme } from '~/theme';
import { getAssetUrl } from '~/utils';
import { useThemeStore } from '~/store/modules/theme';
import { TheIcon, TheIconButton } from '~/components';

defineOptions({ name: 'MainLayout', inheritAttrs: false });

const collapsedWidth = 64;
const sidebarWidth = 280;

const route = useRoute();
const { token, mode } = useTheme();
const themeStore = useThemeStore();
const collapsed = ref<boolean>(false);
const options = computed(() => transformToMenuOptions(menus));
const cssVars = computed(() => {
  return {
    '--content-bg': token.value.bodyColor,
    '--sidebar-bg': mode.value === 'dark' ? '#121517' : '#f9fafb',
    '--appbar-bg': mode.value === 'dark' ? token.value.bodyColor : '#fff',
    '--sidebar-width': collapsed.value ? `${collapsedWidth + 16}px` : `${sidebarWidth}px`,
  };
});
const selectedKey = computed(() => {
  const { hiddenInMenu, activeMenu } = route.meta;
  const name = route.name as string;
  return (hiddenInMenu ? activeMenu : name) || name;
});
const greaterThanLg = useMediaQuery(
  () => `(min-width: ${token.value.breakpoints.values.lg}px)`,
);
const greaterThanXl = useMediaQuery(
  () => `(min-width: ${token.value.breakpoints.values.xl}px)`,
);
const showDrawer = ref<boolean>(false);

watch(greaterThanXl, (greaterThanLg) => {
  collapsed.value = !greaterThanLg;
}, { immediate: true });

function toggleMenu() {
  if (greaterThanLg.value) {
    collapsed.value = !collapsed.value;
  } else {
    showDrawer.value = true;
  }
}

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
        ? () => h(TheIcon, { icon: menu.icon! })
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
          :collapsed-icon-size="22"
        />
      </nav>
    </div>
    <div class="flex-auto flex-col lg:pl-[--sidebar-width] transition-all">
      <header class="sticky top-0 left-0 w-full  bg-[--appbar-bg]">
        <div class="min-h-56px px-16px lg:px-24px py-8px flex flex-y-center border-b-solid gap-x-16px">
          <TheIconButton
            v-if="collapsed"
            icon="line-md:menu-fold-right"
            class="size-40px"
            @click="toggleMenu"
          />
          <TheIconButton
            v-else
            icon="line-md:menu-fold-left"
            class="size-40px"
            @click="toggleMenu"
          />
          <div class="flex-auto" />
          <TheIconButton
            class="size-40px"
            :icon="mode === 'light' ? 'carbon:sun' : 'carbon:moon'"
            :icon-size="24"
            @click="themeStore.toggleThemeMode"
          />
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
  <template v-if="!greaterThanLg">
    <NDrawer v-model:show="showDrawer" placement="left" :width="sidebarWidth" :trap-focus="false">
      <div class="h-full flex-col">
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
            @update:value="showDrawer = false"
          />
        </nav>
      </div>
    </NDrawer>
  </template>
</template>
