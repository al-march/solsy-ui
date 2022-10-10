export const tick = (timeout = 0) =>
  new Promise(resolve => setTimeout(resolve, timeout));
