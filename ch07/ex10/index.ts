function makeFixedSizeArray(size: number) {
  const array = new Array(size);
  return {
    get(index: number) {
      if (index < 0 || array.length <= index) {
        throw new Error(`Array index out of range: ${index}`);
      }
      return array[index];
    },
    set(index: number, value: number) {
      if (index < 0 || array.length <= index) {
        throw new Error(`Array index out of range: ${index}`);
      }
      array[index] = value;
    },
    length() {
      return array.length;
    },
  };
}

export class DynamicSizeArray {
  static INITIAL_SIZE = 4; // 初期サイズ
  len: number;
  array: any;
  constructor() {
    this.len = 0;
    this.array = makeFixedSizeArray(DynamicSizeArray.INITIAL_SIZE);
  }
  get(index: number) {
    this.validateIndex(index);
    return this.array.get(index);
  }
  set(index: number, value: number) {
    this.validateIndex(index);
    if (!this.array[index]) {
      this.len++;
    } 
      this.array.set(index, value);
  }
  length() {
    return this.array.length();
  }
  push(value: number) {
    if (this.len < this.array.length()) {
      // 空きがある場合は空いている始めのindexに代入
      for (let i = 0; i < this.array.length(); i++) {
        if (!this.array.get(i)) {
          this.array.set(i, value);
          this.len++;
          break;
        }
      }
    } else if (this.len >= this.array.length()) {
      // 空きがない場合は、長さ２倍の新しい固定長配列を作成
      const old = this.array;
      this.array = makeFixedSizeArray(old.length() * 2);
      // 古い配列 (old) の要素を新しい配列にコピー
      for (let i = 0; i < old.length(); i++) {
        this.array.set(i, old.get(i));
      }
      this.array.set(old.length(), value);
      this.len++;
    }
  }
  validateIndex(index: number) {
    if (typeof index !== "number" || isNaN(index)) {
      throw new Error(`Invalid input`);
    }
  }
}