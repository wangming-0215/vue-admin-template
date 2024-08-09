<script lang="ts" setup>
import { zhCN } from 'naive-ui';

import AppProvider from './AppProvider.vue';
import { useThemeStore } from './features/theme';
import { TheThemeProvider } from './theme';

const themeStore = useThemeStore();
</script>

<template>
  <NConfigProvider :locale="zhCN" preflight-style-disabled abstract>
    <AppProvider>
      <TheThemeProvider :mode="themeStore.themeMode">
        <RouterView />
      </TheThemeProvider>
    </AppProvider>
  </NConfigProvider>
</template>
