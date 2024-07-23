import type { RouteRecordRaw } from 'vue-router';

const PALETTE_ROUTES: RouteRecordRaw[] = [{
  path: '/palette',
  name: '/palette',
  component: () => import('~/features/palette/index.vue'),
  meta: {
    title: '调色板',
    requiresAuth: false,
    layout: () => import('~/layouts/TheMainLayout/index.vue'),
    icon: 'carbon:color-palette',
  },
}];

export default PALETTE_ROUTES;