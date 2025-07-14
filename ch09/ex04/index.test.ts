import { WarriorClass, MagicWarriorClass, Warrior, MagicWarrior } from "./index.ts"

describe("Warriors with class keyword", () => {
    const testArrayWarrior: [number, number][] = [
        [20, 40],
    ]
    const testArrayWarriorError: [number, ErrorConstructor][] = [
        [0, Error],
        [NaN, Error],
    ]
    test.each(testArrayWarrior)("Warrior(%s) attack(): damage %s", (atk, expected) => {
        let w1 = new WarriorClass(atk);
        expect(w1.attack()).toBe(expected);
    });
    test.each(testArrayWarriorError)("Warrior(%s) attack() Error: damage %s", (atk, expected) =>
        expect(() => new WarriorClass(atk)).toThrow(expected));

    const testArrayMagic: [number, number, number][] = [
        [33, 100, 166],
    ]
    const testArrayErrorMagic: [number, number, ErrorConstructor][] = [
        [0, 1, Error],
        [1, 0, Error],
        [NaN, 1, Error],
        [1, NaN, Error],
        [NaN, NaN, Error],
    ]
    test.each(testArrayMagic)("MagicWarrior(%s, %s) attack(): damage %s", (atk, mgc, expected) => {
        let w1 = new MagicWarriorClass(atk, mgc);
        expect(w1.attack()).toBe(expected);
    });
    test.each(testArrayErrorMagic)("MagicWarrior(%s, %s) attack() Error: damage %s", (atk, mgc, expected) =>
        expect(() => new MagicWarriorClass(atk, mgc)).toThrow(expected));
});

describe("Warriors with prototype", () => {
    const testArrayWarrior: [number, number][] = [
        [20, 40],
    ]
    const testArrayWarriorError: [number, ErrorConstructor][] = [
        [0, Error],
        [NaN, Error],
    ]
    test.each(testArrayWarrior)("Warrior(%s) attack(): damage %s", (atk, expected) => {
        let w1 = new (Warrior as any)(atk);
        expect(w1.attack()).toBe(expected);
    });
    test.each(testArrayWarriorError)("Warrior(%s) attack(): damage %s", (atk, expected) =>
        expect(() => new (Warrior as any)(atk)).toThrow(expected));

    const testArrayMagic: [number, number, number][] = [
        [33, 100, 166],
    ]
    const testArrayMagicError: [number, number, ErrorConstructor][] = [
        [0, 1, Error],
        [1, 0, Error],
        [NaN, 1, Error],
        [1, NaN, Error],
        [NaN, NaN, Error],
    ]
    test.each(testArrayMagic)("MagicWarrior(%s, %s) attack(): damage %s", (atk, mgc, expected) => {
        let w1 = new (MagicWarrior as any)(atk, mgc);
        expect(w1.attack()).toBe(expected);
    });
    test.each(testArrayMagicError)("MagicWarrior(%s, %s) attack(): damage %s", (atk, mgc, expected) =>
        expect(() => new (MagicWarrior as any)(atk, mgc)).toThrow(expected));
});


// result:

// npm run test:ts ./ch09/ex04/

// > preset-ts@1.0.0 test:ts
// > jest --runInBand --coverage ./ch09/ex04/

//  PASS  ch09/ex04/index.test.ts
//   Warriors with class keyword
//     ✓ Warrior(20) attack(): damage 40 (1 ms)
//     ✓ Warrior(0) attack(): damage 0
//     ✓ Warrior(NaN) attack(): damage function Error() { [native code] } (3 ms)
//     ✓ MagicWarrior(33, 100) attack(): damage 166
//     ✓ MagicWarrior(0, 0) attack(): damage 0
//     ✓ MagicWarrior(NaN, 1) attack(): damage function Error() { [native code] } (1 ms)
//     ✓ MagicWarrior(1, NaN) attack(): damage function Error() { [native code] }
//     ✓ MagicWarrior(NaN, NaN) attack(): damage function Error() { [native code] } (1 ms)
//   Warriors with prototype
//     ✓ Warrior(20) attack(): damage 40
//     ✓ Warrior(0) attack(): damage 0
//     ✓ Warrior(NaN) attack(): damage function Error() { [native code] } (6 ms)
//     ✓ MagicWarrior(33, 100) attack(): damage 166
//     ✓ MagicWarrior(0, 0) attack(): damage 0
//     ✓ MagicWarrior(NaN, 1) attack(): damage function Error() { [native code] }
//     ✓ MagicWarrior(1, NaN) attack(): damage function Error() { [native code] } (8 ms)
//     ✓ MagicWarrior(NaN, NaN) attack(): damage function Error() { [native code] } (1 ms)

// ----------|---------|----------|---------|---------|-------------------
// File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
// ----------|---------|----------|---------|---------|-------------------
// All files |     100 |      100 |     100 |     100 |                   
//  index.ts |     100 |      100 |     100 |     100 |                   
// ----------|---------|----------|---------|---------|-------------------
// Test Suites: 1 passed, 1 total
// Tests:       16 passed, 16 total
// Snapshots:   0 total
// Time:        1.12 s, estimated 2 s
// Ran all test suites matching /.\/ch09\/ex04\//i.