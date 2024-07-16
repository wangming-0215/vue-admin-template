<script lang="ts" setup>
import { TheThemeProvider } from './theme';
</script>

<template>
  <TheThemeProvider mode="light">
    <RouterView />
  </TheThemeProvider>
</template>
