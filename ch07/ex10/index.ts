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

type fixedSizeArray = {
  get: (index: number) => number,
  set: (index: number, value: number) => void,
  length: () => number,
}

export class DynamicSizeArray {
  static INITIAL_SIZE = 4; // 初期サイズ
  len: number;
  array: fixedSizeArray;
  constructor() {
    this.len = 0; // 要素の数
    this.array = makeFixedSizeArray(DynamicSizeArray.INITIAL_SIZE);
  }
  get(index: number) {
    this.validateIndex(index);
    return this.array.get(index);
  }
  set(index: number, value: number) {
    this.validateIndex(index);
    if (!this.get(index)) {
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


// 結果：
// npm run test:ts ch07/ex10

// > preset-ts@1.0.0 test:ts
// > jest --runInBand --coverage ch07/ex10

//  PASS  ch07/ex10/index.test.ts
//   DynamicSizeArray get()
//     ✓ get(0): 10 (2 ms)
//     ✓ get(1): undefined
//     ✓ get(2): 20 (1 ms)
//     ✓ get(3): 30
//     ✓ get(-1) error: function Error() { [native code] } (11 ms)
//     ✓ get(4) error: function Error() { [native code] } (1 ms)
//     ✓ get(one) error: function Error() { [native code] } (1 ms)
//     ✓ get(NaN) error: function Error() { [native code] } (1 ms)
//   DynamicSizeArray set()
//     ✓ set(0): 10 (1 ms)
//     ✓ set(1): 20 (1 ms)
//     ✓ set(2): 30
//     ✓ set(-1) error: 10 (1 ms)
//     ✓ set(4) error: 10 (1 ms)
//     ✓ set(one) error: 10 (1 ms)
//     ✓ set(NaN) error: 10 (1 ms)
//     ✓ set() value check (1 ms)
//     ✓ set() value check
//     ✓ set() value check (1 ms)
//   DynamicSizeArray length()
//     ✓ length(): 4 (1 ms)
//     ✓ length(): 4 (2 ms)
//     ✓ length(): 8
//   DynamicSizeArray push()
//     ✓ push(): 1
//     ✓ push(): 4 (1 ms)
//     ✓ push(): 5 (1 ms)

// ----------|---------|----------|---------|---------|-------------------
// File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
// ----------|---------|----------|---------|---------|-------------------
// All files |   97.29 |    92.85 |     100 |   97.14 |                   
//  index.ts |   97.29 |    92.85 |     100 |   97.14 | 12                
// ----------|---------|----------|---------|---------|-------------------
// Test Suites: 1 passed, 1 total
// Tests:       24 passed, 24 total
// Snapshots:   0 total
// Time:        2.404 s, estimated 3 s
// Ran all test suites matching /ch07\/ex10/i.