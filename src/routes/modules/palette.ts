import type { RouteRecordRaw } from 'vue-router';

const PALETTE_ROUTE: RouteRecordRaw = {
  path: '/palette',
  name: '/palette',
  component: () => import('~/features/palette/index.vue'),
  meta: {
    title: '调色板',
    requiresAuth: false,
    layout: () => import('~/layouts/MainLayout/index.vue'),
    icon: 'carbon:color-palette',
  },
};

export default PALETTE_ROUTE;
