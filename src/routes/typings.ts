import type { Component, DefineComponent } from 'vue';

export interface Menu {
  key: string;
  label: string;
  path: string;
  icon?: Component | DefineComponent;
  children?: Menu[];
}
