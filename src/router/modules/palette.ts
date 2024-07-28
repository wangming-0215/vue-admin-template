import type { AppRoute } from '../typings';

const PALETTE_ROUTES: AppRoute[] = [{
  path: '/palette',
  name: '/palette',
  component: () => import('@/features/palette/index.vue'),
  layout: () => import('@/layouts/MainLayout/index.vue'),
  meta: {
    title: '调色板',
    requiresAuth: false,
    icon: 'carbon:color-palette',
  },
}];

export default PALETTE_ROUTES;
