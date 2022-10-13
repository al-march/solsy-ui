export function isChildrenFunction(props: unknown): boolean {
  const children = Object.getOwnPropertyDescriptor(props, 'children');

  if (children == null) {
    return false;
  }

  return typeof children.value === 'function';
}
