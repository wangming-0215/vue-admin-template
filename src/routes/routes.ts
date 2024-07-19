import type { RouteRecordRaw } from 'vue-router';
import {
  DASHBOARD_ROUTE,
  FORM_ROUTE,
  PALETTE_ROUTE,
} from './modules';

export const routes: RouteRecordRaw[] = [
  DASHBOARD_ROUTE,
  PALETTE_ROUTE,
  FORM_ROUTE,
  {
    path: '/404',
    name: '/404',
    component: () => import('~/features/exceptions/PageNotFound.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
].flat();
