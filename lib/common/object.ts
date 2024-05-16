// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

function isPlainObject(item: unknown): boolean {
  return item !== null && !Array.isArray(item) && Object.prototype.toString.call(item) === '[object Object]';
}

function mergeDeep(target: any, ...sources: any): object {
  if (!sources.length) return target;

  for (const source of sources) {
    if (isPlainObject(target) && isPlainObject(source)) {
      for (const key in source) {
        if (isPlainObject(source[key])) {
          if (!target[key]) {
            target[key] = {};
          }
          mergeDeep(target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      }
    }
  }

  return target;
}

export const Obj = {
  isPlainObject,
  mergeDeep,
};
