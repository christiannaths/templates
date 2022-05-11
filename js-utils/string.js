import pluralize from 'pluralize';
export { sanitize } from 'dompurify';
export { typogrify } from 'typogr';
export { default as escapeHtml } from 'escape-html';

export function count(n = 0, str) {
  return pluralize(str, n, true);
}

export function plural(str) {
  return pluralize(str);
}

export function singular(str) {
  pluralize.singular(str);
}

export function initials(str) {
  return str
    .split(/(?=[A-Z])/)
    .map((word) => word.charAt(0))
    .slice(0, 2)
    .join('');
}
