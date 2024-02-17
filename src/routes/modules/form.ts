import type { Route } from '../types';

const formRoute: Route = {
  path: '/form',
  meta: {
    layout: () => import('~/layouts/MainLayout/index.vue'),
    title: '表单',
    requiresAuth: false,
  },
  children: [
    {
      path: '',
      name: '/form/basic',
      component: () => import('~/features/dashboard/index.vue'),
      meta: {
        title: '基础表单',
        requiresAuth: false,
      },
    },
    {
      path: 'advanced',
      name: '/form/advanced',
      component: () => import('~/features/dashboard/index.vue'),
      meta: {
        title: '高级表单',
        requiresAuth: false,
      },
    },
  ],
};

export default formRoute;
