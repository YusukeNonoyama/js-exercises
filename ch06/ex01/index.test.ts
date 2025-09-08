import { newHashTable } from "./index.ts";

describe("check get() method", () => {
  const testArrayGet: [string, string][] = [
    ["key1", "value1"],
    ["key2", "value2"],
    ["key3", "value3"],
    ["key4", "value4"],
    ["key5", "value5"],
    ["key6", "value6"],
    ["key7", "value7"],
    ["key8", "value8"],
  ];
  const testArrayGetError: [any, ErrorConstructor][] = [
    ["key9", Error],
    [{ x: 1, y: 2 }, TypeError],
    [8, TypeError],
    [true, TypeError],
    [undefined, TypeError],
    [null, TypeError],
  ];
  const hashTable = newHashTable(3);
  hashTable.put("key1", "value1");
  hashTable.put("key2", "value2");
  hashTable.put("key3", "value3");
  hashTable.put("key4", "value4");
  hashTable.put("key5", "value5");
  hashTable.put("key6", "value6");
  hashTable.put("key7", "value7");
  hashTable.put("key8", "value8");
  test.each(testArrayGet)("get(): %s => %s", (input, expected) => {
    expect(hashTable.get(input)).toEqual(expected);
  });
  test.each(testArrayGetError)("get() Error: %s => %s", (input, expected) => {
    expect(() => hashTable.get(input)).toThrow(expected);
  });
});

describe("check put() method", () => {
  it("add key-value pair", () => {
    const hashTable = newHashTable(3);
    hashTable.put("key1", "value1");
    hashTable.put("key2", "value2");
    hashTable.put("key3", "value3");
    hashTable.put("key4", "value4");
    hashTable.put("key5", "value5");
    hashTable.put("key6", "value6");
    hashTable.put("key7", "value7");
    hashTable.put("key8", "value8");

    const expected = [
      {
        key: "key1",
        value: "value1",
        next: {
          key: "key4",
          value: "value4",
          next: { key: "key7", value: "value7" },
        },
      },
      {
        key: "key2",
        value: "value2",
        next: {
          key: "key5",
          value: "value5",
          next: { key: "key8", value: "value8" },
        },
      },
      {
        key: "key3",
        value: "value3",
        next: { key: "key6", value: "value6" },
      },
    ];
    expect(hashTable.entries).toEqual(expected);
  });

  it("update key", () => {
    const hashTable = newHashTable(3);
    hashTable.put("key1", "value1");
    hashTable.put("key2", "value2");
    hashTable.put("key1", "value3");
    hashTable.put("key2", "value4");

    const expected = [
      { key: "key1", value: "value3" },
      { key: "key2", value: "value4" },
    ];
    expect(hashTable.entries).toEqual(expected);
  });

  const hashTable = newHashTable(3);
  const testArrayPutError: [any, any, ErrorConstructor][] = [
    [1, "value1", TypeError],
    ["key1", 1, TypeError],
    ["key1", { x: 1, y: 2 }, TypeError],
    ["key1", true, TypeError],
    ["key1", undefined, TypeError],
    ["key1", null, TypeError],
  ];
  test.each(testArrayPutError)(
    "put() Error: %s => %s",
    (input1, input2, expected) => {
      expect(() => hashTable.put(input1, input2)).toThrow(expected);
    },
  );
});

describe("check remove() method", () => {
  it("remove(): ", () => {
    const hashTable = newHashTable(3);
    hashTable.put("key1", "value1");
    hashTable.put("key2", "value2");
    hashTable.put("key3", "value3");
    hashTable.put("key4", "value4");
    hashTable.put("key5", "value5");
    hashTable.put("key6", "value6");
    hashTable.put("key7", "value7");
    hashTable.put("key8", "value8");

    hashTable.remove("key1");
    hashTable.remove("key2");
    hashTable.remove("key3");
    hashTable.remove("key4");
    hashTable.remove("key5");
    hashTable.remove("key6");
    hashTable.remove("key7");
    hashTable.remove("key8");

    const expected = [undefined, undefined, undefined];
    expect(hashTable.entries).toEqual(expected);
  });

  it("remove() in reverse order: ", () => {
    const hashTable = newHashTable(3);
    hashTable.put("key1", "value1");
    hashTable.put("key2", "value2");
    hashTable.put("key3", "value3");
    hashTable.put("key4", "value4");
    hashTable.put("key5", "value5");
    hashTable.put("key6", "value6");
    hashTable.put("key7", "value7");
    hashTable.put("key8", "value8");

    hashTable.remove("key8");
    hashTable.remove("key7");
    hashTable.remove("key6");
    hashTable.remove("key5");
    hashTable.remove("key4");
    hashTable.remove("key3");
    hashTable.remove("key2");
    hashTable.remove("key1");

    const expected = [undefined, undefined, undefined];

    expect(hashTable.entries).toEqual(expected);
  });

  const hashTable = newHashTable(3);
  const testArrayRemoveError: [any, ErrorConstructor][] = [
    ["key9", Error],
    [{ x: 1, y: 2 }, TypeError],
    [8, TypeError],
    [true, TypeError],
    [undefined, TypeError],
    [null, TypeError],
  ];
  test.each(testArrayRemoveError)(
    "remove(%s) Error: => %s",
    (input, expected) => {
      expect(() => hashTable.remove(input)).toThrow(expected);
    },
  );
});

describe("check hashTable input", () => {
  it("check hashTable size 1", () => {
    const hashTable_01 = newHashTable(1);
    hashTable_01.put("key1", "value1");
    hashTable_01.put("key2", "value2");
    hashTable_01.put("key3", "value3");
    hashTable_01.put("key4", "value4");
    hashTable_01.put("key5", "value5");
    hashTable_01.put("key6", "value6");
    hashTable_01.put("key7", "value6");
    hashTable_01.put("key8", "value8");
    hashTable_01.put("key9", "value9");
    hashTable_01.put("key10", "value10");

    const expected = [
      {
        key: "key1",
        value: "value1",
        next: {
          key: "key2",
          value: "value2",
          next: {
            key: "key3",
            value: "value3",
            next: {
              key: "key4",
              value: "value4",
              next: {
                key: "key5",
                value: "value5",
                next: {
                  key: "key6",
                  value: "value6",
                  next: {
                    key: "key7",
                    value: "value6",
                    next: {
                      key: "key8",
                      value: "value8",
                      next: {
                        key: "key9",
                        value: "value9",
                        next: {
                          key: "key10",
                          value: "value10",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    ];
    expect(hashTable_01.entries).toEqual(expected);
  });

  it("check hashTable size 100", () => {
    const hashTable_10 = newHashTable(10);
    hashTable_10.put("key1", "value1");
    hashTable_10.put("key2", "value2");
    hashTable_10.put("key3", "value3");
    hashTable_10.put("key4", "value4");
    hashTable_10.put("key5", "value5");
    hashTable_10.put("key6", "value6");
    hashTable_10.put("key7", "value6");
    hashTable_10.put("key8", "value8");
    hashTable_10.put("key9", "value9");
    hashTable_10.put("key10", "value10");
    hashTable_10.put("key11", "value11");

    const expected = [
      {
        key: "key1",
        value: "value1",
        next: { key: "key11", value: "value11" },
      },
      { key: "key2", value: "value2" },
      { key: "key3", value: "value3" },
      { key: "key4", value: "value4" },
      { key: "key5", value: "value5" },
      { key: "key6", value: "value6" },
      { key: "key7", value: "value6" },
      { key: "key8", value: "value8" },
      { key: "key9", value: "value9" },
      { key: "key10", value: "value10" },
    ];
    expect(hashTable_10.entries).toEqual(expected);
  });
  const testArrayHashTableError: [any, ErrorConstructor][] = [
    [0, RangeError],
    [-5, RangeError],
    ["10", TypeError],
    [{ x: 1, y: 2 }, TypeError],
    [true, TypeError],
    [undefined, TypeError],
    [null, TypeError],
  ];

  test.each(testArrayHashTableError)(
    "newHashTable() Error: %s => %s",
    (input, expected) => {
      expect(() => newHashTable(input)).toThrow(expected);
    },
  );
});

// 結果：
// npm run test:ts ch06/ex01/index.

// > preset-ts@1.0.0 test:ts
// > jest --runInBand --coverage ch06/ex01/index.

//  PASS  ch06/ex01/index.test.ts
//   check get() method
//     ✓ get(): key1 => value1 (2 ms)
//     ✓ get(): key2 => value2
//     ✓ get(): key3 => value3 (12 ms)
//     ✓ get(): key4 => value4
//     ✓ get(): key5 => value5 (1 ms)
//     ✓ get(): key6 => value6 (1 ms)
//     ✓ get(): key7 => value7
//     ✓ get(): key8 => value8 (1 ms)
//     ✓ get() Error: key9 => function Error() { [native code] } (13 ms)
//     ✓ get() Error: { x: 1, y: 2 } => function TypeError() { [native code] } (1 ms)
//     ✓ get() Error: 8 => function TypeError() { [native code] } (1 ms)
//     ✓ get() Error: true => function TypeError() { [native code] } (1 ms)
//     ✓ get() Error: undefined => function TypeError() { [native code] } (1 ms)
//     ✓ get() Error: null => function TypeError() { [native code] } (2 ms)
//   check put() method
//     ✓ add key-value pair (2 ms)
//     ✓ update key
//     ✓ put() Error: 1 => value1
//     ✓ put() Error: key1 => 1 (1 ms)
//     ✓ put() Error: key1 => { x: 1, y: 2 } (2 ms)
//     ✓ put() Error: key1 => true
//     ✓ put() Error: key1 => undefined (1 ms)
//     ✓ put() Error: key1 => null (1 ms)
//   check remove() method
//     ✓ remove():  (1 ms)
//     ✓ remove() in reverse order:
//     ✓ remove(key9) Error: => function Error() { [native code] } (1 ms)
//     ✓ remove({ x: 1, y: 2 }) Error: => function TypeError() { [native code] } (1 ms)
//     ✓ remove(8) Error: => function TypeError() { [native code] } (1 ms)
//     ✓ remove(true) Error: => function TypeError() { [native code] } (1 ms)
//     ✓ remove(undefined) Error: => function TypeError() { [native code] } (1 ms)
//     ✓ remove(null) Error: => function TypeError() { [native code] } (1 ms)
//   check hashTable input
//     ✓ check hashTable size 1
//     ✓ check hashTable size 100 (1 ms)
//     ✓ newHashTable() Error: 0 => function RangeError() { [native code] } (1 ms)
//     ✓ newHashTable() Error: -5 => function RangeError() { [native code] } (1 ms)
//     ✓ newHashTable() Error: 10 => function TypeError() { [native code] } (1 ms)
//     ✓ newHashTable() Error: { x: 1, y: 2 } => function TypeError() { [native code] } (1 ms)
//     ✓ newHashTable() Error: true => function TypeError() { [native code] } (1 ms)
//     ✓ newHashTable() Error: undefined => function TypeError() { [native code] } (1 ms)
//     ✓ newHashTable() Error: null => function TypeError() { [native code] } (1 ms)

// ----------|---------|----------|---------|---------|-------------------
// File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
// ----------|---------|----------|---------|---------|-------------------
// All files |     100 |      100 |     100 |     100 |
//  index.ts |     100 |      100 |     100 |     100 |
// ----------|---------|----------|---------|---------|-------------------
// Test Suites: 1 passed, 1 total
// Tests:       39 passed, 39 total
// Snapshots:   0 total
// Time:        2.792 s, estimated 3 s
// Ran all test suites matching /ch06\/ex01\/index./i.
