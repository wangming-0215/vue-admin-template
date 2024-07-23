import type { RouteRecordInfo, RouteRecordRaw } from 'vue-router';
import type { Component, DefineComponent } from 'vue';
import {
  AUTH_ROUTES,
  DASHBOARD_ROUTES,
  FORM_ROUTES,
  PALETTE_ROUTES,
} from './modules';

declare module 'vue-router' {
  export interface RouteMeta {
    title?: string;
    requiresAuth?: boolean;
    layout?: () => Promise<Component | DefineComponent>;
    /** 在菜单中隐藏 */
    hiddenInMenu?: boolean;
    /** 高亮 */
    activeMenu?: string;
    /** 菜单 icon */
    icon?: string;
  }

  export interface TypesConfig {
    RouteNamedMap: RouteNamedMap;
  }
}

interface RouteNamedMap {
  '/': RouteRecordInfo<
    '/',
    '/',
    Record<never, never>,
    Record<never, never>
  >;
  '/palette': RouteRecordInfo<
    '/palette',
    '/palette',
    Record<never, never>,
    Record<never, never>
  >;
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

export const routes: RouteRecordRaw[] = [
  AUTH_ROUTES,
  DASHBOARD_ROUTES,
  PALETTE_ROUTES,
  FORM_ROUTES,
  {
    path: '/404',
    name: '/404',
    component: () => import('~/features/exceptions/PageNotFound.vue'),
    meta: {
      hiddenInMenu: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    meta: {
      hiddenInMenu: true,
    },
  },
].flat();
