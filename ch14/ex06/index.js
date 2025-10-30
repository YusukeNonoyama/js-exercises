export function createLoggingProxy(target) {
  const logArr = [];
  const handler = {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver); // 処理は Reflect へ委譲
      // メソッド呼び出し時に logArr に呼び出し記録を保存
      if (typeof value === "function") {
        return function (...args) {
          const options = { hour: "numeric", minute: "numeric", second: "numeric", hour12: false };
          const timeStamp = Intl.DateTimeFormat("jp-JP", options).format(new Date());
          logArr.push({
            invokedAt: timeStamp,
            methodName: prop.toString(),
            args: args,
          });
          return value.call(this, ...args);
        };
      }
      return value; // メソッドでなければそのまま返す
    },
  };
  const oproxy = new Proxy(target, handler);
  return [oproxy, logArr]; // Proxy と 配列 双方への参照を返却する
}

