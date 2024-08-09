<script lang="ts" setup>
import { useAuthStore } from '@/features/auth';

defineOptions({ name: 'AppAccount', inheritAttrs: false });

const authStore = useAuthStore();
</script>

<template>
  <div class="relative">
    <NAvatar :size="40" round :src="authStore.profile?.avatar" />
    <span class="absolute inline-block size-12px bg-success rd-1/2 border-2px border-solid border-#fff dark:border-[--body-bg-color] bottom-6px right-0" />
  </div>
</template>
