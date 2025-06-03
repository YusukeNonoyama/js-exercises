export function cache(f: Function) {
  const cacheMap = new WeakMap();

  return function(obj: {}) {
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
export function slowFn(obj: any) {
    let i = 0;
    while(i < 7**10){
        i++;
    }
    obj.iteration = i;
    return obj;
}

// cachedSlowFnを同じ引数で複数回呼び出すと、2回目以降はキャッシュが返る
// const cachedSlowFn = cache(slowFn);

// let obj = {};
// console.log(cachedSlowFn(obj));
// console.log(cachedSlowFn(obj));
// console.log(cachedSlowFn(obj));

// obj = {};