import { RiPaletteLine } from '@remixicon/vue';
import type { RouteRecordRaw } from 'vue-router';

const PALETTE_ROUTE: RouteRecordRaw = {
  path: '/palette',
  name: '/palette',
  component: () => import('~/features/palette/index.vue'),
  meta: {
    title: '调色板',
    requiresAuth: false,
    layout: () => import('~/layouts/MainLayout/index.vue'),
    icon: RiPaletteLine,
  },
};

export default PALETTE_ROUTE;
