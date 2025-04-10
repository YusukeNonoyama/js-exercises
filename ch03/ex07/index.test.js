import { equalArrays } from "./index.js";

test("ch03-ex07", () => {
  const x = true; // ここを変更
  const y = false; // ここを変更

  expect(equalArrays(x, y)).toBe(true);
  expect(x).not.toEqual(y);
});

test("ch03-ex07", () => {
    const x = {x: 2}; // ここを変更
    const y = {x: 888, y: 8888}; // ここを変更
  
    expect(equalArrays(x, y)).toBe(true);
    expect(x).not.toEqual(y);
  });

// lengthが定義されていない者同士を引数にすると全てtrueとなる