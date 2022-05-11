export function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

export function compose(...fns) {
  return function (x) {
    return fns.reduceRight(function (val, fn) {
      return fn(val);
    }, x);
  };
}

export function pipe(...fns) {
  return function (x) {
    return fns.reduce(function (val, fn) {
      return fn(val);
    }, x);
  };
}
