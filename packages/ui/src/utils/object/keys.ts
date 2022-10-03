export const ObjectKeys = <Obj extends object>(obj: Obj) => {
  return Object.keys(obj) as Array<keyof Obj>;
};
