type NaiveColorType = 'primary' | 'success' | 'error' | 'warning' | 'info';
type NaiveColorScene = '' | 'Hover' | 'Pressed' | 'Suppl';

export const types: NaiveColorType [] = ['primary', 'success', 'error', 'warning', 'info'];
export const scenes: NaiveColorScene[] = ['', 'Hover', 'Pressed', 'Suppl'];

export default function getPaletteVars() {
  const vars: Record<string, string> = {};

  types.forEach((type) => {
    scenes.forEach((scene) => {
      const s = scene.toLowerCase();
      const key = [type, s].filter(t => !!t).join('-');
      const value = `var(--${[type, 'color', s].filter(t => !!t).join('-')})`;
      vars[key] = value;
    });
  });

  return vars;
}
