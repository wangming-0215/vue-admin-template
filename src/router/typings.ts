import type { Component, DefineComponent } from 'vue';
import type { RouteRecordInfo } from 'vue-router';

export interface Menu {
  key: string;
  label: string;
  path: string;
  icon?: string;
  children?: Menu[];
}

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
