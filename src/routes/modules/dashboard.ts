import type { Route } from '../types';

const dashboardRoute: Route = {
  path: '/',
  name: '/',
  component: () => import('~/features/dashboard/index.vue'),
  meta: {
    title: 'Dashboard',
    requiresAuth: false,
    layout: () => import('~/layouts/MainLayout/index.vue'),
  },
};

export default dashboardRoute;
