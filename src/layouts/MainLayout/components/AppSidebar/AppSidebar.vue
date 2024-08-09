<script setup lang="ts">
import type { MenuOption } from 'naive-ui';
import { AppLogo } from '@/components';

export interface AppSidebarProps {
  menus?: MenuOption[];
  selectedKey?: string;
  collapsed?: boolean;
  collapsedWidth?: number;
}

defineOptions({ name: 'AppSidebar', inheritAttrs: false });
defineProps<AppSidebarProps>();
</script>

<template>
  <div
    class="fixed top-0 left-0 bg-#f9fafb dark:bg-#121517 h-full flex-col border-r-solid z-1000 transition-all"
    :class="$attrs.class"
  >
    <div class="text-24px p-16px flex-center gap-8px">
      <AppLogo />
    </div>
    <nav class="flex-auto overflow-y-auto py-16px" style="scrollbar-width: none;">
      <NMenu
        :options="menus"
        :value="selectedKey"
        :indent="18"
        :collapsed="collapsed"
        :collapsed-width="collapsedWidth"
        :collapsed-icon-size="24"
      />
    </nav>
  </div>
</template>
