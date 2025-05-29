export class typedMap {
    constructor(keyType: string, valueType: string, entries: any[]) {
        if (entries) {
            for (let [k, v] of entries) {
                if (typeof k !== keyType || typeof v !== valueType) {
                    throw new TypeError(`Wrong type for entry[${k}, ${v}]`);
                }
            }
        }
        (this as any).map = new Map(entries);
        (this as any).keyType = keyType;
        (this as any).valueType = valueType;
        (this as any).entries = entries;
    }
    keyCheck(key: any) {
        if ((this as any).keyType && typeof key !== (this as any).keyType) {
            throw new TypeError(`${key} is not of type ${(this as any).keyType}`);
        }
    }
    valueCheck(value: any) {
        if ((this as any).valueType && typeof value !== (this as any).valueType) {
            throw new TypeError(`${value} is not of type ${(this as any).valueType}`);
        }
    }
    set(key: any, value: any) {
        this.keyCheck(key);
        this.valueCheck(value);
        return (this as any).map.set(key, value);
    }
    get(key: any) {
        this.keyCheck(key);
        return (this as any).map.get(key)
    }
    delete(key: any) {
        this.keyCheck(key);
        return (this as any).map.delete(key)
    }
    has(key: any) {
        this.keyCheck(key);
        return (this as any).map.has(key)
    }
    size() {
        return (this as any).map.size;
    }
    keys() {
        return (this as any).map.keys();
    }
    values() {
        return (this as any).map.values();
    }
    clear() {
        return (this as any).map.clear();
    }
    entries() {
        return (this as any).map.entries();
    }
}

// let mapA = new typedMap("number", "number", [[1, 100], [2, 2]]);

// mapA.set(4, 4);
// console.log(mapA);
// console.log(mapA.get(1));
// console.log(mapA.size());


// let mapB = new typedMap("string", "number", [["1", 100], ["2", 2]]);
// mapB.set("4", 4);
// console.log(mapB);
// console.log(mapB.get("1"));
// console.log(mapB.has("1"));
// console.log(mapB.size());
// console.log(mapB.entries());
// console.log(mapB.delete("1"));
// console.log(mapB);
// console.log(mapB.size());
// console.log(mapB.clear());
// console.log(mapB);
// console.log(mapB.size());
