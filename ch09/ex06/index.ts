export class TypedMap {
  map;
  keyType;
  valueType;
  entryArray;
  constructor(keyType: string, valueType: string, entryArray: any[]) {
    if (entryArray) {
      for (let [k, v] of entryArray) {
        if (typeof k !== keyType || typeof v !== valueType) {
          throw new TypeError(`Wrong type for entry[${k}, ${v}]`);
        }
      }
    }
    this.map = new Map(entryArray);
    this.keyType = keyType;
    this.valueType = valueType;
    this.entryArray = entryArray;
  }
  keyCheck(key: any) {
    if (this.keyType && typeof key !== this.keyType) {
      throw new TypeError(`${key} is not of type ${this.keyType}`);
    }
  }
  valueCheck(value: any) {
    if (this.valueType && typeof value !== this.valueType) {
      throw new TypeError(`${value} is not of type ${this.valueType}`);
    }
  }
  set(key: any, value: any) {
    this.keyCheck(key);
    this.valueCheck(value);
    return this.map.set(key, value);
  }
  get(key: any) {
    this.keyCheck(key);
    return this.map.get(key);
  }
  delete(key: any) {
    this.keyCheck(key);
    return this.map.delete(key);
  }
  has(key: any) {
    this.keyCheck(key);
    return this.map.has(key);
  }
  size() {
    return this.map.size;
  }
  keys() {
    return this.map.keys();
  }
  values() {
    return this.map.values();
  }
  clear() {
    return this.map.clear();
  }
  entries() {
    return this.map.entries();
  }
}
