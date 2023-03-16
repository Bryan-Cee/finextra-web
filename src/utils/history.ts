import { Transaction } from "@prisma/client";

export const isDate = (d: unknown) => d instanceof Date;
export const isEmpty = (o: unknown) => Object.keys(o).length === 0;
export const isObject = (o: unknown) => o != null && typeof o === 'object';
export const hasOwnProperty = (o: unknown, ...rest: [string,]) => Object.prototype.hasOwnProperty.call(o, ...rest);
export const isEmptyObject = (o: unknown) => isObject(o) && isEmpty(o);

const makeObjectWithoutPrototype = () => Object.create(null) as unknown as Record<string, unknown>;

export function diff<T extends Record<string, unknown>>(lhs: T, rhs: T) {
  if (lhs === rhs) return {}; // equal return no diff

  if (!isObject(lhs) || !isObject(rhs)) return rhs; // return updated rhs

  const deletedValues = Object.keys(lhs).reduce((acc, key) => {
    if (!hasOwnProperty(rhs, key)) {
      acc[key] = undefined;
    }

    return acc;
  }, makeObjectWithoutPrototype());

  if (isDate(lhs) || isDate(rhs)) {
    if (lhs.valueOf() == rhs.valueOf()) return {};
    return rhs;
  }

  return Object.keys(rhs).reduce((acc, key) => {
    if (!hasOwnProperty(lhs, key)) {
      acc[key] = rhs[key]; // return added r key
      return acc;
    }
    const left = lhs[key] as T;
    const right = rhs[key] as T;

    const difference = diff(left, right);

    // If the difference is empty, and the lhs is an empty object or the rhs is not an empty object
    if (
      isEmptyObject(difference) &&
      !isDate(difference) &&
      (isEmptyObject(lhs[key]) || !isEmptyObject(rhs[key]))
    )
      return acc; // return no diff

    acc[key] = difference; // return updated key
    return acc; // return updated key
  }, deletedValues);
}

export function getParsedHistory(diffedHistory: ReturnType<typeof getDiffBetweenTransactionHistory>) {
  const keys = ['description', 'amount', 'type', 'expense_date', 'accountId'];
  const parsedHistory = diffedHistory.map((item) => {
    const parsedItem: Record<string, unknown> = {};
    keys.forEach((key) => {
      if (item[key]) {
        parsedItem[key] = item[key];
      }
    });
    return parsedItem;
  });
  return parsedHistory;
}
