import { h } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { RiDashboard2Line } from '@remixicon/vue';

const dashboardRoute: RouteRecordRaw = {
  path: '/',
  name: '/',
  component: () => import('~/features/dashboard/index.vue'),
  meta: {
    title: 'Dashboard',
    requiresAuth: false,
    layout: () => import('~/layouts/MainLayout/index.vue'),
    icon: () => h(RiDashboard2Line),
  },
};

export default dashboardRoute;
