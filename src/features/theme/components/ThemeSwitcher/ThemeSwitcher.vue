<script lang="ts" setup>
import { useThemeStore } from '../../store';

import { IconButton } from '@/components';

defineOptions({ name: 'ThemeSwitcher', inheritAttrs: false });

const themeStore = useThemeStore();
</script>

<template>
  <IconButton
    class="size-40px"
    :icon="themeStore.themeMode === 'light' ? 'carbon:sun' : 'carbon:moon'"
    :icon-size="24"
    @click="themeStore.toggleThemeMode"
  />
</template>
