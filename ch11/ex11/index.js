// N 回何もしないループの時間を返す
function costOfLoop(N) {
  const start = performance.now();
  for (let i = 0; i < N; i++) {}
  const end = performance.now();
  return end - start;
}

// N 回 "Hello".length を実行 + N 回何もしないループの時間を返す
function costOfLengthPlusLoop(N) {
  const str = "Hello";
  let res = 0;
  const start = performance.now();
  for (let i = 0; i < N; i++) {
    res = str.length;
  }
  const end = performance.now();

  if (res !== 5) {
    throw new Error("something is wrong");
  }
  return end - start;
}

// "Hello".length 1回あたりの時間を返す
function costOfLength(N) {
  const lhs = costOfLengthPlusLoop(N);
  const rhs = costOfLoop(N);
  return (lhs - rhs) / N;
}

// 以下を変更して実験しなさい
console.log(costOfLength(1));
console.log(costOfLength(10));
console.log(costOfLength(100));
console.log(costOfLength(1000));
console.log(costOfLength(10000));
console.log(costOfLength(100000));
console.log(costOfLength(1000000));
console.log(costOfLength(10000000));
console.log(costOfLength(100000000));

console.log("=================================");
console.log(costOfLoop(1000));
console.log(costOfLoop(10000));
console.log(costOfLoop(100000));

console.log("=================================");
console.log(costOfLengthPlusLoop(1000));
console.log(costOfLengthPlusLoop(10000));
console.log(costOfLengthPlusLoop(100000));

// 結果
// 0.0013699999999801094
// 0.00007339999999942393
// 0.00005575000000021646
// 0.000004895000000004757
// 0.000001997599999998556
// 0.000003198720000000037
// 1.926999999994905e-9
// -1.9679800000000113e-8
// -3.834919999999898e-9
// =================================
// 0.0005060000000298714
// 0.0026349999999979445
// 0.02568100000002005
// =================================
// 0.00035500000001320586
// 0.0026310000000080436
// 0.025634999999965657
