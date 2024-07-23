<script lang="ts" setup>
import { useDialog, useMessage, useNotification } from 'naive-ui';
import { createTextVNode, defineComponent } from 'vue';

defineOptions({ name: 'AppProvider', inheritAttrs: false });

const ContextHolder = defineComponent({
  name: 'ContextHolder',
  inheritAttrs: false,
  setup() {
    function register() {
      window.$dialog = useDialog();
      window.$notification = useNotification();
      window.$message = useMessage();
    }

    register();

    return () => createTextVNode();
  },
});
</script>

<template>
  <NDialogProvider>
    <NNotificationProvider>
      <NMessageProvider>
        <ContextHolder />
        <slot />
      </NMessageProvider>
    </NNotificationProvider>
  </NDialogProvider>
</template>
