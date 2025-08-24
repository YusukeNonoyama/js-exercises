export const unwritableAndUnconfigurableObj = function () {
    return Object.freeze({ a: 1 }); // 書き込み不可、再定義不可
};

export const writableAndUnconfigurableObj = function () {
    return Object.seal({ b: 2 });   // 書き込み可、再定義不可
};

export const nestedUnwritableObj = function () {
    const o = { c: { d: { e: 3 } } };
    Object.freeze(o);
    Object.freeze(o.c);
    Object.freeze(o.c.d);
    return o;
};