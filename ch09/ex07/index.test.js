import { InstrumentedLinkedList } from "./index.js";

describe("InstrumentedLinkedList", () => {
  it("#push", () => {
    const list = new InstrumentedLinkedList();
    list.push("A");
    expect(list.pushCount).toBe(1);
  });
  it("#pushAll", () => {
    const list = new InstrumentedLinkedList();
    list.pushAll("A", "B");
    expect(list.pushCount).toBe(2);
  });
});

// 結果：

// npm run test:js ./ch09/ex07/

// > preset-ts@1.0.0 test:js
// > node --experimental-vm-modules node_modules/jest/bin/jest.js --runInBand ./ch09/ex07/

//  PASS  ch09/ex07/index.test.js
//   InstrumentedLinkedList
//     ✓ #push (1 ms)
//     ✓ #pushAll

// Test Suites: 1 passed, 1 total
// Tests:       2 passed, 2 total
// Snapshots:   0 total
// Time:        0.659 s, estimated 1 s
// Ran all test suites matching /.\/ch09\/ex07\//i.
