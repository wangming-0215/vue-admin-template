<script lang="ts" setup>
import { useThemeStore } from './store/modules/theme';
import { TheThemeProvider } from './theme';

const themeStore = useThemeStore();
</script>

<template>
  <TheThemeProvider :mode="themeStore.themeMode">
    <RouterView />
  </TheThemeProvider>
</template>
