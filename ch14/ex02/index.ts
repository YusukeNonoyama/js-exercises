// MyArrayはArrayを継承し、map(), slice()の結果としてMyArrayLikeのオブジェクトを返す。（結果の型を変更するにはSymbol.speciesを指定する）
// MyArrayLikeは配列のようなクラスでArrayを継承しない

export class MyArrayLike {
  #items: any[];
  constructor(...items: any[]) {
    this.#items = new Array(...items);
  }
  // lengthのセッターとゲッターを追加、Arrayを継承していないため
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
