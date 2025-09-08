export class MyArrayLike {
  #items: any[];
  constructor(...items: any[]) {
    this.#items = new Array(...items);
  }
  // lengthのセッターとゲッターを追加
  get length() {
    return this.#items.length;
  }
  set length(value) {
    this.#items.length = value;
  }
}

export class MyArray extends Array<any> {
  constructor(items: any[]) {
    super(...items);
  }
  static get [Symbol.species](): any {
    return MyArrayLike;
  }
}
