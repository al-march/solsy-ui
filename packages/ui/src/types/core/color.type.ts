export const DaisyColors = [
  'primary',
  'secondary',
  'accent',
  'info',
  'success',
  'warning',
  'error',
] as const;

export const DaisyColorsSmall = ['primary', 'secondary', 'accent'] as const;

export type DaisyColor = typeof DaisyColors[number];
export type DaisyColorSmall = typeof DaisyColorsSmall[number];
