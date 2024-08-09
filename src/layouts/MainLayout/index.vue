<script lang="ts" setup>
import { computed, ref, watch } from 'vue';

import { AppAccount, AppSidebar, AppSidebarDrawer } from './components';
import { useMenus } from './hooks';

import { ThemeSwitcher } from '@/features/theme';
import { AppHidden, IconButton } from '@/components';
import { useBreakpoints } from '@/hooks';
import { getAssetUrl } from '@/utils';

defineOptions({ name: 'MainLayout', inheritAttrs: false });

const sidebarWidth = 280;
const sidebarCollapsedWidth = 64;

const { menus, selectedKey } = useMenus();
const breakpoints = useBreakpoints();

const collapsed = ref<boolean>(false);
const cssVars = computed(() => {
  return {
    '--sidebar-width': collapsed.value ? `${sidebarCollapsedWidth}px` : `${sidebarWidth}px`,
  };
});
const showDrawer = ref<boolean>(false);

const isSmallerThanXl = breakpoints.smaller('xl');

watch(isSmallerThanXl, (smaller) => {
  collapsed.value = smaller;
}, { immediate: true });
</script>

<template>
  <div class="flex-col flex-auto bg-body" :style="cssVars">
    <AppHidden dir="down" breakpoint="lg">
      <AppSidebar
        class="w-[--sidebar-width]"
        :menus="menus"
        :selected-key="selectedKey"
        :collapsed="collapsed"
        :collapsed-width="sidebarCollapsedWidth"
      />
    </AppHidden>
    <AppHidden dir="up" breakpoint="lg">
      <AppSidebarDrawer
        v-model:show="showDrawer"
        :menus="menus"
        :selected-key="selectedKey"
      />
    </AppHidden>
    <div class="flex-auto flex-col lg:pl-[--sidebar-width] transition-all">
      <header class="sticky top-0 left-0 w-full bg-#fff dark:bg-[--body-bg-color] z-1001">
        <div class="min-h-56px px-16px lg:px-24px py-8px flex flex-y-center border-b-solid gap-x-16px">
          <AppHidden dir="up" breakpoint="lg">
            <IconButton
              icon="line-md:menu"
              class="size-40px"
              @click="showDrawer = true"
            />
          </AppHidden>
          <AppHidden dir="down" breakpoint="lg">
            <IconButton
              v-if="!collapsed"
              icon="line-md:menu-fold-left"
              class="size-40px"
              @click="collapsed = true"
            />
            <IconButton
              v-else
              icon="line-md:menu-fold-right"
              class="size-40px"
              @click="collapsed = false"
            />
          </AppHidden>
          <div class="flex-auto" />
          <ThemeSwitcher />
          <AppAccount />
        </div>
      </header>
      <main class="flex-auto flex-col">
        <RouterView />
      </main>
    </div>
  </div>
</template>
