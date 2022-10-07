export const justifyItems = ['start', 'end', 'center', 'stretch'] as const;

export type JustifyItems = typeof justifyItems[number];
