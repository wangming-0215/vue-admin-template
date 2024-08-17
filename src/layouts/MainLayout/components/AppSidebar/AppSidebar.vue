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
    class="fixed left-0 top-0 z-1000 h-full flex-col border-r-solid bg-#f9fafb transition-all dark:bg-#121517"
    :class="$attrs.class"
  >
    <div class="flex-center gap-8px p-16px text-24px">
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
