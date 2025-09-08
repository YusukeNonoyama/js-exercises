import { instanceOf } from "./index.ts";

describe("instanceOf()", () => {
  class A {
    constructor() {}
  }
  class B extends A {
    constructor() {
      super();
    }
  }
  class C extends B {
    constructor() {
      super();
    }
  }
  class D {
    constructor() {}
  }

  let objectA = new A();
  let objectB = new B();
  let objectC = new C();
  let objectD = new D();

  const testArray: [{}, Function, boolean][] = [
    [objectA, objectA.constructor, true],
    [objectB, objectA.constructor, true],
    [objectC, objectA.constructor, true],
    [objectD, objectA.constructor, false],
    [objectA, objectD.constructor, false],
    [objectB, objectD.constructor, false],
    [objectC, objectD.constructor, false],
    [objectD, objectD.constructor, true],
    [{}, objectA.constructor, false],
  ];
  test.each(testArray)(
    "%s is or extends %s constructor: %s",
    (object, constructor, expected) => {
      expect(instanceOf(object, constructor)).toBe(expected);
    },
  );
});

// 結果：
// npm run test:ts ./ch09/ex05/

// > preset-ts@1.0.0 test:ts
// > jest --runInBand --coverage ./ch09/ex05/

//  PASS  ch09/ex05/index.test.ts
//   instanceOf()
//     ✓ A {} is or extends class A {
//         constructor() { }
//         ;
//     } constructor: true (1 ms)
//     ✓ B {} is or extends class A {
//         constructor() { }
//         ;
//     } constructor: true
//     ✓ C {} is or extends class A {
//         constructor() { }
//         ;
//     } constructor: true (1 ms)
//     ✓ D {} is or extends class A {
//         constructor() { }
//         ;
//     } constructor: false
//     ✓ A {} is or extends class D {
//         constructor() { }
//         ;
//     } constructor: false
//     ✓ B {} is or extends class D {
//         constructor() { }
//         ;
//     } constructor: false
//     ✓ C {} is or extends class D {
//         constructor() { }
//         ;
//     } constructor: false
//     ✓ D {} is or extends class D {
//         constructor() { }
//         ;
//     } constructor: true
//     ✓ {} is or extends class A {
//         constructor() { }
//         ;
//     } constructor: false

// ----------|---------|----------|---------|---------|-------------------
// File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
// ----------|---------|----------|---------|---------|-------------------
// All files |     100 |      100 |     100 |     100 |
//  index.ts |     100 |      100 |     100 |     100 |
// ----------|---------|----------|---------|---------|-------------------
// Test Suites: 1 passed, 1 total
// Tests:       9 passed, 9 total
// Snapshots:   0 total
// Time:        1.301 s, estimated 2 s
// Ran all test suites matching /.\/ch09\/ex05\//i.
