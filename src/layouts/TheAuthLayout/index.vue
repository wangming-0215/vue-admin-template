<script lang="ts" setup>
import { getAssetUrl } from '~/utils';

defineOptions({ name: 'TheAuthLayout', inheritAttrs: false });
</script>

<template>
  <div class="flex-auto flex-col">
    <div class="grid grid-cols-1 xl:grid-cols-[1fr_800px] flex-auto">
      <div class="bg-#f9fafb dark:bg-#202427 hidden xl:flex">
        <img class="w-full object-cover" :src="getAssetUrl('auth_bg.jpeg')" />
      </div>
      <div class="bg-white shadow-[0_3px_14px_0_rgba(0,0,0,0.08)] dark:(shadow-[0_3px_14px_0_rgba(0,0,0,0.5)] bg-#090a0b)">
        <div class="h-full p-24px flex-col flex-center">
          <div class=" max-w-420px w-full">
            <RouterView />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
