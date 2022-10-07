export const alignItems = [
  'start',
  'end',
  'center',
  'baseline',
  'stretch',
] as const;

export type AlignItems = typeof alignItems[number];
