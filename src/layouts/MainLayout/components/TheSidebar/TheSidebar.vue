<script setup lang="ts">
import type { MenuOption } from 'naive-ui';
import TheLogo from '../TheLogo';

export interface TheSidebarProps {
  menus?: MenuOption[];
  selectedKey?: string;
}

defineOptions({ name: 'TheSidebar', inheritAttrs: false });
defineProps<TheSidebarProps>();
</script>

<template>
  <div
    class="fixed top-0 left-0 w-[sidebar-width] bg-[--sidebar-bg] h-full flex-col border-r-solid z-1000 transition-all"
    :class="$attrs.class"
  >
    <div class="text-24px p-16px flex-center gap-8px">
      <TheLogo />
    </div>
    <nav class="flex-auto overflow-y-auto py-16px px-8px" style="scrollbar-width: none;">
      <NMenu :options="menus" :value="selectedKey" :indent="18" />
    </nav>
  </div>
</template>
