type Constructor = {
    new(): any;
};

// valueのタイプをGenericで指定することもできるが、エラーが返せなくなるので問題の要件を満たせない
// type Constructor<T = any> = new (...args: any[]) => T;

class Foo { }

export class TypeMap {
    map: Map<Constructor, any>;
    constructor(a?: any[]) {
        this.map = new Map(a);
    }
    set<T>(key: Constructor, value: any) {
        if (typeof new key().valueOf() !== typeof value) {
            throw TypeError("Value is not a member of the constructor")
        }
        return this.map.set(key, value);
    }
    get(key: Constructor) {
        return this.map.get(key);
    }
}

// const a = new Number(5);
// console.log(typeof a.valueOf());

// const typeMap = new TypeMap();

// typeMap.set(String, "hello");
// typeMap.set(Number, 123);
// typeMap.set(Boolean, true);
// typeMap.set(Foo, new Foo());

// console.log(typeMap.get(String));
// console.log(typeMap.get(Number));
// console.log(typeMap.get(Foo)); 