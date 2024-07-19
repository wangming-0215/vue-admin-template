<script lang="ts" setup>
defineOptions({ name: 'TheAuthLayout', inheritAttrs: false });
</script>

<template>
  <div class="flex-auto flex-col">
    <div class="grid md:grid-cols-[1fr_800px] flex-auto">
      <div class="dark:bg-black" />
      <div class="bg-white">
        <RouterView />
      </div>
    </div>
  </div>
</template>
