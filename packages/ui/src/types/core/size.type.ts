export const DaisySizes = ['lg', 'md', 'sm', 'xs'] as const;

export type DaisySize = typeof DaisySizes[number];
