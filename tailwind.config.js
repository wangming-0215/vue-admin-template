/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ...createPalette(),
      },
    },
  },
  plugins: [],
};

function createPalette() {
  const paletteKeys = ['primary', 'success', 'warning', 'error'];
  const scenes = ['', 'suppl', 'hover', 'pressed', 'active'];

  const result = [];

  paletteKeys.forEach((key) => {
    scenes.forEach((scene) => {
      const color = [key, scene].filter(t => !!t).join('-');
      result.push({
        [color]: `var(--${color}})`,
      });
    });
  });

  return result;
}
