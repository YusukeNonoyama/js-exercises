export function cache(f: Function) {
  const cacheMap = new WeakMap();

  return function (obj: {}) {
    // objがcacheMapにある場合はcacheMapから値を取得
    if (cacheMap.has(obj)) {
      return cacheMap.get(obj);
    }
    // objがcacheMapになければ、cacheMapに保存してから値を返す
    const result = f(obj);
    cacheMap.set(obj, result);
    return result;
  };
}

// loopを一定数まで繰り返すだけの関数
export function slowFn(obj: { iteration: number }) {
  let i = 0;
  let result = 0;
  while (i < obj.iteration) {
    result += i; // iを足し続ける
    i++;
  }
  return result;
}
