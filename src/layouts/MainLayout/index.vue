<script lang="ts" setup>
import { computed, ref } from 'vue';

import { TheSidebar, TheSidebarDrawer } from './components';
import { useMenus } from './hooks';

import { useTheme } from '~/theme';
import { useThemeStore } from '~/store/modules/theme';
import { TheHidden, TheIconButton } from '~/components';

defineOptions({ name: 'MainLayout', inheritAttrs: false });

const { token, mode } = useTheme();
const themeStore = useThemeStore();
const { menus, selectedKey } = useMenus();
const cssVars = computed(() => {
  return {
    '--content-bg': token.value.bodyColor,
    '--sidebar-bg': mode.value === 'dark' ? '#121517' : '#f9fafb',
    '--appbar-bg': mode.value === 'dark' ? token.value.bodyColor : '#fff',
    '--sidebar-width': '280px',
  };
});

const showDrawer = ref<boolean>(false);
</script>

<template>
  <div class="flex-col flex-auto bg-[--content-bg]" :style="cssVars">
    <TheHidden dir="down" breakpoint="lg">
      <TheSidebar
        class="w-[--sidebar-width]"
        :menus="menus"
        :selected-key="selectedKey"
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
          <div class="flex-auto" />
          <TheIconButton
            class="size-40px"
            :icon="mode === 'light' ? 'carbon:sun' : 'carbon:moon'"
            :icon-size="24"
            @click="themeStore.toggleThemeMode"
          />
          <NAvatar :size="40" round src="https://picsum.photos/id/237/200/200" />
        </div>
      </header>
      <main class="flex-auto flex-col">
        <div class="max-w-1440px mx-auto my-0 p-16px md:p-24px w-full">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>
