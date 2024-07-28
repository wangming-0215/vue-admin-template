import type { AppRoute } from '../typings';

const DASHBOARD_ROUTES: AppRoute[] = [{
  path: '/',
  name: '/',
  component: () => import('@/features/dashboard/views/index.vue'),
  layout: () => import('@/layouts/MainLayout/index.vue'),
  meta: {
    title: 'Dashboard',
    requiresAuth: true,
    icon: 'carbon:laptop',
  },
}];

export default DASHBOARD_ROUTES;
