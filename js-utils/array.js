export { default as sample } from 'lodash/sample';

export function slice(...args) {
  return Array.prototype.slice.call(...args);
}

export function ofLength(n, fill) {
  return new Array(n).fill(fill);
}
