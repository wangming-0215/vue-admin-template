import type { Breakpoint, Breakpoints } from '@/theme';

interface GenerateClassesOptions {
  maxWidth: Breakpoint | false;
  breakpoints: Breakpoints['values'];
}

export default function generateClasses(options: GenerateClassesOptions) {
  const { maxWidth, breakpoints } = options;

  const classes = {
    'w-full': true,
    'mx-auto': true,
    'px-16px': true,
    'sm:px-24px': true,
    'transition-[padding]': true,
    'duration-200': true,
  };

  if (maxWidth === 'xs') {
    Object.assign(classes, {
      'xs:max-w-[444px]': breakpoints.xs <= 444,
      'xs:max-w-screen-sx': breakpoints.xs > 444,
    });
  }

  if (maxWidth && maxWidth !== 'xs') {
    Object.assign(classes, {
      'sm:max-w-screen-sm': maxWidth === 'sm',
      'md:max-w-screen-md': maxWidth === 'md',
      'lg:max-w-screen-lg': maxWidth === 'lg',
      'xl:max-w-screen-xl': maxWidth === 'xl',
      '2xl:max-w-screen-2xl': maxWidth === '2xl',
    });
  }

  return classes;
}
