<script lang="ts" setup>
import { zhCN } from 'naive-ui';

import AppProvider from './AppProvider.vue';
import { useThemeStore } from './features/theme';
import type { Theme } from './theme';
import { AppThemeProvider } from './theme';

const themeStore = useThemeStore();

const theme: Theme = {
  common: {
    primaryColor: '#ff9500',
    fontFamily: [
      '"HarmonyOS Sans Regular"',
      '"Noto Sans SC"',
      'ui-sans-serif',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      '"Noto Sans"',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      '"Noto Color Emoji"',
    ].join(', '),
  },
};
</script>

<template>
  <NConfigProvider :locale="zhCN" preflight-style-disabled abstract>
    <AppProvider>
      <AppThemeProvider :mode="themeStore.themeMode" :theme-overrides="theme">
        <RouterView />
      </AppThemeProvider>
    </AppProvider>
  </NConfigProvider>
</template>
