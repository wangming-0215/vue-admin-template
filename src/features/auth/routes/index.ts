import type { RouteRecordInfo } from 'vue-router';
import type { AppRoute } from '@/router';

const AUTH_ROUTES: AppRoute[] = [
  {
    path: '/auth/sign-in',
    name: '/auth/sign-in',
    component: () => import('@/pages/auth/sign-in.vue'),
    layout: () => import('@/layouts/AuthLayout/index.vue'),
    meta: {
      title: '登录',
      requiresAuth: false,
      hiddenInMenu: true,
    },
  },
  {
    path: '/auth/sign-up',
    name: '/auth/sign-up',
    component: () => import('@/pages/auth/sign-up.vue'),
    layout: () => import('@/layouts/AuthLayout/index.vue'),
    meta: {
      title: '注册',
      requiresAuth: false,
      hiddenInMenu: true,
    },
  },
];

export default AUTH_ROUTES;

declare module '@/router' {
  interface RouteNamedMap {
    '/auth/sign-in': RouteRecordInfo<
      '/auth/sign-in',
      '/auth/sign-in',
      Record<never, never>,
      Record<never, never>
    >;
    '/auth/sign-up': RouteRecordInfo<
      '/auth/sign-up',
      '/auth/sign-up',
      Record<never, never>,
      Record<never, never>
    >;
  }
}
