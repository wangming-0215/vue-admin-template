export interface Menu {
  key: string;
  label: string;
  path: string;
  icon?: string;
  children?: Menu[];
}
