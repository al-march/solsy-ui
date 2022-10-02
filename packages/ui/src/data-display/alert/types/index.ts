export const AlertTypes = ['info', 'success', 'warning', 'error'] as const;

export type AlertType = typeof AlertTypes[number];
