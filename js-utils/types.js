import { Timestamp } from 'services/firestore';
import { Text } from 'slate';

export function isNull(value) {
  return value === null;
}

export function isUndefined(value) {
  return typeof value === 'undefined';
}

export function isString(str) {
  return typeof str === 'string' || str instanceof String;
}

export function isArray(value) {
  return Array.isArray(value);
}

export function isObject(obj) {
  return Object.getPrototypeOf(obj) === Object.prototype;
}

export function isFunction(obj) {
  return typeof obj === 'function';
}

export function isDate(value) {
  return value instanceof Date;
}

export function isTimestamp(value) {
  return value instanceof Timestamp;
}

export function isTextNode(node) {
  return Text.isText(node);
}

export function isType(type) {
  return {
    null: isNull,
    undefined: isUndefined,
    string: isString,
    object: isObject,
    array: isArray,
    function: isFunction,
    date: isDate,
    timestamp: isTimestamp,
    textNode: isTextNode,
  }[type];
}

export default isType;
