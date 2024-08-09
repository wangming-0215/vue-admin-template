<script setup lang="ts">
import type { MenuOption } from 'naive-ui';
import { AppLogo } from '@/components';

export interface AppSidebarDrawerProps {
  menus?: MenuOption[];
  selectedKey?: string;
}

defineOptions({ name: 'AppSidebarDrawer', inheritAttrs: false });
defineProps<AppSidebarDrawerProps>();

const show = defineModel<boolean>('show', { default: false });
</script>

<template>
  <NDrawer v-model:show="show" placement="left" :width="300" :trap-focus="false">
    <div class="h-full flex-col">
      <div class="text-24px p-16px flex-center gap-8px">
        <AppLogo />
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
