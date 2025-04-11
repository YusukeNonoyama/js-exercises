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

// console.log(equalArrays(8, 888))    // 数値に.lengthは定義されていないからundefinedが返る
// console.log(equalArrays(true, false))    // 論理型に.lengthは定義されていないからundefinedが返る
// console.log(equalArrays({x: 2}, {x: 888, y: 8888}))    // オブジェクトに.lengthは定義されていないからundefinedが返る
// console.log(equalArrays(8, {x: 888, y: 8888}))
// console.log(equalArrays(true, {x: 2}))
// console.log(equalArrays([1, 0], [1, -0]))   // 明らかに違う値ではないけど一応
// console.log(equalArrays([1, " "], [1, ` `]))    // 明らかに違う値ではないけど一応