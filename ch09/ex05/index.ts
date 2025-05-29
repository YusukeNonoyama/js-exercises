export function instanceOf(object: {}, constructor: Function) {
    while (true) {
        if (object.constructor.prototype === constructor.prototype) {
            return true;
        }
        // 次のプロトタイプを代入する
        object = Object.getPrototypeOf(object);
        // object = object.constructor.prototype だとうまくいかない

        if (object === null) {
            return false;
        }
    }
}

// class A {
//     constructor() { };
// }
// class B extends A {
//     constructor() {
//         super();
//     };
// }
// class C extends B {
//     constructor() {
//         super();
//     };
// }
// class D {
//     constructor() { };
// }

// let objectA = new A();
// let objectB = new B();
// let objectC = new C();
// let objectD = new D();


// console.log(instanceOf(objectC, A.prototype.constructor));
// console.log(instanceOf(objectD, A.prototype.constructor));
// console.log(instanceOf(objectA, A.prototype.constructor));

// console.log(Object.getPrototypeOf(objectC));
// console.log(objectC.constructor.prototype);
