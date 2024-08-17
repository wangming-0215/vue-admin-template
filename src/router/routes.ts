import type { RouteRecordRaw } from 'vue-router';

import { AUTH_ROUTES } from '@/features/auth';

import {
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
    path: '/:pathMatch(.*)*',
    component: () => import('@/features/exceptions/PageNotFound.vue'),
    meta: {
      hiddenInMenu: true,
    },
  },
].flat();
