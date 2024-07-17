import type { RouteRecordRaw } from 'vue-router';
import { RiDashboard2Line } from '@remixicon/vue';

const DASHBOARD_ROUTE: RouteRecordRaw = {
  path: '/',
  name: '/',
  component: () => import('~/features/dashboard/index.vue'),
  meta: {
    title: 'Dashboard',
    requiresAuth: false,
    layout: () => import('~/layouts/MainLayout/index.vue'),
    icon: RiDashboard2Line,
  },
};

export default DASHBOARD_ROUTE;
