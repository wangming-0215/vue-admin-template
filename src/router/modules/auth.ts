import type { RouteRecordRaw } from 'vue-router';

const AUTH_ROUTES: RouteRecordRaw[] = [
  {
    path: '/auth/sign-in',
    name: '/auth/sign-in',
    component: () => import('~/features/auth/views/sign-in/index.vue'),
    meta: {
      title: '登录',
      layout: () => import('~/layouts/TheAuthLayout/index.vue'),
      requiresAuth: false,
      hiddenInMenu: true,
    },
  },
];

export default AUTH_ROUTES;
