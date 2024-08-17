<script lang="ts" setup>
import { useAuthStore } from '@/features/auth';

defineOptions({ name: 'AppAccount', inheritAttrs: false });

const authStore = useAuthStore();
</script>

<template>
  <div class="relative">
    <NAvatar :size="40" round :src="authStore.profile?.avatar" />
    <span class="absolute bottom-6px right-0 inline-block size-12px border-2px border-solid border-#fff rd-1/2 bg-success dark:border-[--body-bg-color]" />
  </div>
</template>
