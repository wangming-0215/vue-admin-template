export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export interface Breakpoints {
  keys: Breakpoint[];
  values: { [key in Breakpoint]: number };
  up: (key: Breakpoint) => string;
  down: (key: Breakpoint) => string;
  between: (start: Breakpoint, end: Breakpoint) => string;
  only: (key: Breakpoint) => string;
}

export default function createBreakpoints(): Breakpoints {
  const values: Breakpoints['values'] = {
    'xs': 0,
    'sm': 640,
    'md': 768,
    'lg': 1024,
    'xl': 1280,
    '2xl': 1536,
  };

  const keys = Object.keys(values) as Breakpoint[];

  function up(key: Breakpoint) {
    return `@media (min-width:${values[key]}px)`;
  }

  function down(key: Breakpoint) {
    const value = values[key];
    return `@media (max-width:${value - 5 / 100}px)`;
  }

  function between(start: Breakpoint, end: Breakpoint) {
    const startValue = values[start];
    const endValue = values[end];
    return `@media (min-width:${startValue}px) and (max-width:${endValue - 5 / 100}px)`;
  }

  function only(key: Breakpoint) {
    if (keys.indexOf(key) + 1 < keys.length) {
      return between(key, keys[keys.indexOf(key) + 1]);
    }

    return up(key);
  }

  return {
    keys,
    values,
    up,
    down,
    between,
    only,
  };
}
