<script lang="ts" setup>
import { zhCN } from 'naive-ui';

import AppProvider from './AppProvider.vue';
import { useThemeStore } from './features/theme';
import { AppThemeProvider } from './theme';

const themeStore = useThemeStore();
</script>

<template>
  <NConfigProvider :locale="zhCN" preflight-style-disabled abstract>
    <AppProvider>
      <AppThemeProvider :mode="themeStore.themeMode">
        <RouterView />
      </AppThemeProvider>
    </AppProvider>
  </NConfigProvider>
</template>
