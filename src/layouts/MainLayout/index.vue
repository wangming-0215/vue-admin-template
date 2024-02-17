<script lang="ts" setup>
import { createMenuFromRoutes, routes } from '~/routes';

defineOptions({ name: 'MainLayout', inheritAttrs: false });

window.console.log('MainLayout setup');

const menus = createMenuFromRoutes(routes);

// #f7fafc
</script>

<template>
  <header absolute left-240px h-48px flex="~ items-center" p="x-8px" bg-primary-color style="width: calc(100% - 240px)">
    Header
  </header>
  <div class="layout-side-bar" w-240px>
    <div fixed bottom-0 left-0 right-auto top-0 w-240px>
      <div shadow-sider wh-full>
        <n-menu :options="menus" label-field="title" />
      </div>
    </div>
  </div>
  <div max-w-full flex="~ auto" pl-240px pt-48px>
    <div w-full flex flex-auto flex-col>
      <RouterView />
    </div>
  </div>
</template>
