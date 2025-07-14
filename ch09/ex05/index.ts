export function instanceOf(object: {}, constructor: Function) {
    while (true) {
        if (object.constructor.prototype === constructor.prototype) {
            return true;
        }
        // 次のプロトタイプを代入する
        object = Object.getPrototypeOf(object);

        if (object === null) {
            return false;
        }
    }
}
