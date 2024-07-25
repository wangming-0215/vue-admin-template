import type { RouteRecordRaw } from 'vue-router';
import {
  AUTH_ROUTES,
  DASHBOARD_ROUTES,
  FORM_ROUTES,
  PALETTE_ROUTES,
} from './modules';

export const routes: RouteRecordRaw[] = [
  AUTH_ROUTES,
  DASHBOARD_ROUTES,
  PALETTE_ROUTES,
  FORM_ROUTES,
  {
    path: '/404',
    name: '/404',
    component: () => import('@/features/exceptions/PageNotFound.vue'),
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
