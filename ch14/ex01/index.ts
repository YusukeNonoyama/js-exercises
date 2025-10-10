export const unwritableAndUnconfigurableObj = function () {
  return Object.freeze({ a: 1 }); // 書き込み不可、再定義不可
};

export const writableAndUnconfigurableObj = function () {
  return Object.seal({ b: 2 }); // 書き込み可、再定義不可
};

export const nestedUnwritableObj = function () {
  // 生成したオブジェクトを返すことを利用
  return Object.freeze({ c: Object.freeze({ d: Object.freeze({ e: 3 }) }) });
};
