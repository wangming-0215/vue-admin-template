<script lang="ts" setup>
import { useThemeStore } from './store/modules/theme';

const theme = useThemeStore();
</script>

<template>
  <n-config-provider :theme-overrides="theme.naiveThemeOverride" :abstract="true">
    <RouterView />
  </n-config-provider>
</template>
