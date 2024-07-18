import type { RouteRecordRaw } from 'vue-router';

const DASHBOARD_ROUTE: RouteRecordRaw = {
  path: '/',
  name: '/',
  component: () => import('~/features/dashboard/index.vue'),
  meta: {
    title: 'Dashboard',
    requiresAuth: false,
    layout: () => import('~/layouts/MainLayout/index.vue'),
    icon: 'carbon:laptop',
  },
};

export default DASHBOARD_ROUTE;
