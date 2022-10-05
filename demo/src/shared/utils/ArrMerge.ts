export const ArrMerge = <T, Y>(array: T[], types: Y[]) => {
  return [...array, ...types] as Array<T | Y>;
};
