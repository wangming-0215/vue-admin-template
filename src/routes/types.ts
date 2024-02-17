import type { RouteComponent, RouteMeta, RouteRecordRaw } from 'vue-router';
import type { Lazy } from '~/types';

type LayoutRouteMeta = Partial<RouteMeta> & { layout: RouteComponent | Lazy<RouteComponent> };
type LayoutRoute = Omit<RouteRecordRaw, 'meta' | 'children'> & {
  meta: LayoutRouteMeta;
  children?: Route[];
};

type PageRoute = Omit<RouteRecordRaw, 'children'> & { children?: Route[] };

export type Route = LayoutRoute | PageRoute;

export interface Menu {
  key: string;
  title: string;
  icon: string;
  path: string;
  children?: Menu[];
}
