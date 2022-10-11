export const generateAnchor = (name: string) => {
  const id = name.split(' ').join('-');
  return `section-${id}`;
};
