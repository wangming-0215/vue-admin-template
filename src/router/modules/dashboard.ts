import type { RouteRecordRaw } from 'vue-router';

const DASHBOARD_ROUTES: RouteRecordRaw[] = [{
  path: '/',
  name: '/',
  component: () => import('~/features/dashboard/views/index.vue'),
  meta: {
    title: 'Dashboard',
    requiresAuth: false,
    layout: () => import('~/layouts/TheMainLayout/index.vue'),
    icon: 'carbon:laptop',
  },
}];

export default DASHBOARD_ROUTES;
