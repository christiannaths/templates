import { customAlphabet } from 'nanoid';
import {
  uniqueNamesGenerator,
  animals,
  NumberDictionary,
} from 'unique-names-generator';

const numberDictionary = NumberDictionary.generate({
  min: 100,
  max: 999,
});

export function token(n = 28) {
  const chars =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const nanoid = customAlphabet(chars, n);
  return nanoid();
}

export function shortId() {
  return token(11);
}

export function friendlyId({ prefix = '' } = {}) {
  return uniqueNamesGenerator({
    dictionaries: [[prefix.toLowerCase()], animals, numberDictionary],
    separator: '',
    style: 'capital',
  });
}
