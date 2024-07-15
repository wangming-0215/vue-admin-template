<script lang="ts" setup>
import { useThemeStore } from './store/modules/theme';

const theme = useThemeStore();
</script>

<template>
  <NConfigProvider :theme-overrides="theme.naiveThemeOverride" :abstract="true">
    <RouterView />
    <NGlobalStyle />
  </NConfigProvider>
</template>
