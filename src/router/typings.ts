import type { Component, DefineComponent } from 'vue';
import type { RouteRecordInfo, RouteRecordRaw } from 'vue-router';

export interface RouteNamedMap {
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
}

export interface Menu {
  key: string;
  label: string;
  path: string;
  icon?: string;
  children?: Menu[];
}

type LayoutComponent = Component | DefineComponent;

export type AppRoute = RouteRecordRaw & { layout?: LayoutComponent | Utils.Lazy<LayoutComponent> };

// interface RouteNamedMap {

//   '/auth/sign-in': RouteRecordInfo<
//     '/auth/sign-in',
//     '/auth/sign-in',
//     Record<never, never>,
//     Record<never, never>
//   >;
//   '/auth/sign-up': RouteRecordInfo<
//     '/auth/sign-up',
//     '/auth/sign-up',
//     Record<never, never>,
//     Record<never, never>
//   >;
// }
