<script setup lang="ts">
import type { MenuOption } from 'naive-ui';
import TheLogo from '../TheLogo';

export interface TheSidebarDrawerProps {
  menus?: MenuOption[];
  selectedKey?: string;
}

defineOptions({ name: 'TheSidebarDrawer', inheritAttrs: false });
defineProps<TheSidebarDrawerProps>();

const show = defineModel<boolean>('show', { default: false });
</script>

<template>
  <NDrawer v-model:show="show" placement="left" :width="300" :trap-focus="false">
    <div class="h-full flex-col">
      <div class="text-24px p-16px flex-center gap-8px">
        <TheLogo />
      </div>
      <nav class="flex-auto overflow-y-auto py-16px px-8px" style="scrollbar-width: none;">
        <NMenu
          :options="menus"
          :value="selectedKey"
          :indent="18"
          @update:value="show = false"
        />
      </nav>
    </div>
  </NDrawer>
</template>
