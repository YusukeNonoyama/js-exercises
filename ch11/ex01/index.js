class Foo {}

export class TypeMap {
  constructor() {
    this.map = new Map();
  }
  set(key, value) {
    if (typeof new key().valueOf() !== typeof value) {
      throw Error("Value is not a member of the constructor");
    }
    return this.map.set(key, value);
  }
  get(key) {
    return this.map.get(key);
  }
}

const a = new Number(5);
console.log(typeof a.valueOf());

const typeMap = new TypeMap();

typeMap.set(String, "hello");
typeMap.set(Number, 123);
typeMap.set(Boolean, true);
typeMap.set(Foo, new Foo());

console.log(typeMap.get(String));
console.log(typeMap.get(Number));
console.log(typeMap.get(Foo));
