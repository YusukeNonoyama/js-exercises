export function createLoggingProxy(target) {
    const logArr = [];
    const handler = {
        get(target, prop, receiver) {
            const value = Reflect.get(target, prop, receiver);
            if (typeof value === 'function') {
                // メソッド呼び出し時の関数
                return function (...args) {
                    const opts = {
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                        hour12: false
                    };
                    const timeStamp = Intl.DateTimeFormat("jp-JP", opts).format(new Date());
                    logArr.push({
                        invokedAt: timeStamp,
                        methodName: prop.toString(),
                        args: args
                    });
                    return value.call(this, ...args); // 後段の呼び出しのためにコンテキストを保持
                };
            }
            return value;   // メソッドでなければそのまま返す
        }
    };
    const oproxy = new Proxy(target, handler);
    return [oproxy, logArr];
}

const obj = {
    greet(name) {
        return `Hello, ${name}`;
    },
    add(a, b) {
        return a + b;
    }
};

const [objProxy, objLogArr] = createLoggingProxy(obj);

// 呼び出し
console.log(objProxy.greet("Alice")); // Hello, Alice
console.log(objProxy.add(2, 3));      // 5

console.log(objProxy);
console.log(objLogArr);
