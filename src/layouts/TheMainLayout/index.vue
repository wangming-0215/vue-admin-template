<script lang="ts" setup>
import { computed, ref, watch } from 'vue';

import { TheSidebar, TheSidebarDrawer } from './components';
import { useMenus } from './hooks';

import { useTheme } from '~/theme';
import { useThemeStore } from '~/store/modules/theme';
import { TheHidden, TheIconButton } from '~/components';
import { useBreakpoints } from '~/hooks';
import { getAssetUrl } from '~/utils';

defineOptions({ name: 'MainLayout', inheritAttrs: false });

const sidebarWidth = 280;
const sidebarCollapsedWidth = 64;

const { mode } = useTheme();
const themeStore = useThemeStore();
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
      <header class="sticky top-0 left-0 w-full bg-#fff dark:bg-[--body-bg-color] z-1001">
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
          <div class="relative">
            <NAvatar :size="40" round :src="getAssetUrl('avatar.jpg')" />
            <span class="absolute inline-block size-12px bg-success rd-1/2 border-2px border-solid border-#fff dark:border-[--body-bg-color] bottom-6px right-0" />
          </div>
        </div>
      </header>
      <main class="flex-auto flex-col">
        <RouterView />
      </main>
    </div>
  </div>
</template>
