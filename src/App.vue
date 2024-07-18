<script lang="ts" setup>
import { zhCN } from 'naive-ui';
import { useThemeStore } from './store/modules/theme';
import { TheThemeProvider } from './theme';

const themeStore = useThemeStore();
</script>

<template>
  <NConfigProvider :locale="zhCN">
    <TheThemeProvider :mode="themeStore.themeMode">
      <RouterView />
    </TheThemeProvider>
  </NConfigProvider>
</template>
