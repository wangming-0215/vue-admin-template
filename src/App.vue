<script lang="ts" setup>
import { zhCN } from 'naive-ui';
import { useThemeStore } from './store/modules/theme';
import { TheThemeProvider } from './theme';
import AppProvider from './AppProvider.vue';

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
