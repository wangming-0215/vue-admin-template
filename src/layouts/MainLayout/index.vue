<script lang="ts" setup>
import { computed, ref, watch } from 'vue';

import { TheSidebar, TheSidebarDrawer } from './components';
import { useMenus } from './hooks';

import { useTheme } from '~/theme';
import { useThemeStore } from '~/store/modules/theme';
import { TheHidden, TheIconButton, TheLocalAssetProvider } from '~/components';
import { useBreakpoints } from '~/hooks';

defineOptions({ name: 'MainLayout', inheritAttrs: false });

const sidebarWidth = 280;
const sidebarCollapsedWidth = 64;

const { token, mode } = useTheme();
const themeStore = useThemeStore();
const { menus, selectedKey } = useMenus();
const breakpoints = useBreakpoints();

const collapsed = ref<boolean>(false);
const cssVars = computed(() => {
  return {
    '--content-bg': token.value.bodyColor,
    '--sidebar-bg': mode.value === 'dark' ? '#121517' : '#f9fafb',
    '--appbar-bg': mode.value === 'dark' ? token.value.bodyColor : '#fff',
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
  <div class="flex-col flex-auto bg-[--content-bg]" :style="cssVars">
    <TheHidden dir="down" breakpoint="lg">
      <TheSidebar
        class="w-[--sidebar-width]"
        :menus="menus"
        :selected-key="selectedKey"
        :collapsed="collapsed"
        :collapsed-width="sidebarCollapsedWidth"
      />
    </TheHidden>
    <TheHidden dir="up" breakpoint="lg">
      <TheSidebarDrawer
        v-model:show="showDrawer"
        :menus="menus"
        :selected-key="selectedKey"
      />
    </TheHidden>
    <div class="flex-auto flex-col lg:pl-[--sidebar-width] transition-all">
      <header class="sticky top-0 left-0 w-full bg-[--appbar-bg] z-1001">
        <div class="min-h-56px px-16px lg:px-24px py-8px flex flex-y-center border-b-solid gap-x-16px">
          <TheHidden dir="up" breakpoint="lg">
            <TheIconButton
              icon="line-md:menu"
              class="size-40px"
              @click="showDrawer = true"
            />
          </TheHidden>
          <TheHidden dir="down" breakpoint="lg">
            <TheIconButton
              v-if="!collapsed"
              icon="line-md:menu-fold-left"
              class="size-40px"
              @click="collapsed = true"
            />
            <TheIconButton
              v-else
              icon="line-md:menu-fold-right"
              class="size-40px"
              @click="collapsed = false"
            />
          </TheHidden>
          <div class="flex-auto" />
          <TheIconButton
            class="size-40px"
            :icon="mode === 'light' ? 'carbon:sun' : 'carbon:moon'"
            :icon-size="24"
            @click="themeStore.toggleThemeMode"
          />
          <TheLocalAssetProvider v-slot="{ src }" name="avatar.jpg">
            <NAvatar :size="40" round :src="src" />
          </TheLocalAssetProvider>
        </div>
      </header>
      <main class="flex-auto flex-col">
        <RouterView />
      </main>
    </div>
  </div>
</template>
