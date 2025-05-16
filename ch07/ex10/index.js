function makeFixedSizeArray(size) {
  const array = new Array(size);
  return {
    get(index) {
      if (index < 0 || array.length <= index) {
        throw new Error(`Array index out of range: ${index}`);
      }
      return array[index];
    },
    set(index, value) {
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

  constructor() {
    this.len = 0;
    this.array = makeFixedSizeArray(DynamicSizeArray.INITIAL_SIZE);
  }
  get(index) {
    if (index < 0 || this.length() <= index) {
      throw new Error(`Array index out of range: ${index}`);
    }
    return this.array[index];
  }
  set(index, value) {
    if (index < 0 || this.length() <= index) {
      throw new Error(`Array index out of range: ${index}`);
    }
    if (!this.array[index]) {
      this.array[index] = value;
      this.len++;
    } else {
      this.array[index] = value;
    }
  }
  length() {
    return this.array.length();
  }
  push(value) {
    if (this.len < this.array.length()) {
      // 空きがある場合は空いている始めのindexに代入
      for (let i = 0; i < this.array.length(); i++) {
        if (!this.array[i]) {
          this.array[i] = value;
          this.len++;
          break;
        }
      }
    } else if (this.len >= this.array.length()) {
      // 空きがない場合は、長さ２倍の新しい固定長配列を作成
      const old = this.array;
      this.array = makeFixedSizeArray(old.length() * 2);
      // 古い配列 (old) の要素を新しい配列にコピー
      for (let i = 0; i < old.length(); i++){
        this.array[i] = old[i];
      }
      this.array[old.length()] = value;
      this.len++;
    }
  }
}


// let a = new DynamicSizeArray();

// console.log(a.array.length(), a.len);
// a.set(0, 20);
// a.set(3, 5);
// a.push(100);
// a.push(100);
// a.push(100);
// console.log(a.array.length(), a.len);


// console.log("========================================");
// for (let i = 0; i < a.array.length(); i++) {
//   console.log(a.get(i));
// }
