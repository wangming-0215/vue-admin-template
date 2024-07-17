<script lang="ts" setup>
import { useAppStore } from './store/modules/app';
import { TheThemeProvider } from './theme';

const appStore = useAppStore();
</script>

<template>
  <TheThemeProvider :mode="appStore.themeMode">
    <RouterView />
  </TheThemeProvider>
</template>
