import type { RouteRecordRaw } from 'vue-router';

const AUTH_ROUTES: RouteRecordRaw[] = [
  {
    path: '/auth/sign-in',
    name: '/auth/sign-in',
    component: () => import('@/views/auth/sign-in/index.vue'),
    meta: {
      title: '登录',
      layout: () => import('@/layouts/AuthLayout/index.vue'),
      requiresAuth: false,
      hiddenInMenu: true,
    },
  },
  {
    path: '/auth/sign-up',
    name: '/auth/sign-up',
    component: () => import('@/views/auth/sign-up/index.vue'),
    meta: {
      title: '注册',
      layout: () => import('@/layouts/AuthLayout/index.vue'),
      requiresAuth: false,
      hiddenInMenu: true,
    },
  },
];

export default AUTH_ROUTES;
