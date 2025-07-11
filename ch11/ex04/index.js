// これから (N, K) と (K, M) の行列の乗算を行う (この値は色々変更して試すこと)
const [N, K, M] = [100, 200, 300];

// 配列版: (N, K) の行列を要素数 N * K の1次元配列で表現する ((i, j) は array[K * i + j] で参照)
const lhsA = Array(N * K)
  .fill(0.0)
  .map(() => Math.random());
const rhsA = Array(K * M)
  .fill(0.0)
  .map(() => Math.random());
const resultA = Array(N * M).fill(0.0);

function arrayMultiply() {
  resultA.fill(0.0);
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      for (let k = 0; k < K; k++) {
        // 全てのkについて　Lik * Rkj　の和が resultAのij
        resultA[K + i + j] += lhsA[N * i + k] * rhsA[M * k + j];
      }
    }
  }
}

// 型付き配列版 (Float64Array 以外の型も試してみると良い)
// const lhsB = new Float64Array(N * K).fill(0.0).map((_, i) => lhsA[i]);
// const rhsB = new Float64Array(K * M).fill(0.0).map((_, i) => rhsA[i]);
// const resultB = new Float64Array(N * M).fill(0.0);
// const lhsB = new Float32Array(N * K).fill(0.0).map((_, i) => lhsA[i]);
// const rhsB = new Float32Array(K * M).fill(0.0).map((_, i) => rhsA[i]);
// const resultB = new Float32Array(N * M).fill(0.0);

// const lhsB = new Int8Array(N * K).fill(0.0).map((_, i) => lhsA[i]);
// const rhsB = new Int8Array(K * M).fill(0.0).map((_, i) => rhsA[i]);
// const resultB = new Int8Array(N * M).fill(0.0);
// const lhsB = new Int16Array(N * K).fill(0.0).map((_, i) => lhsA[i]);
// const rhsB = new Int16Array(K * M).fill(0.0).map((_, i) => rhsA[i]);
// const resultB = new Int16Array(N * M).fill(0.0);
// const lhsB = new Int32Array(N * K).fill(0.0).map((_, i) => lhsA[i]);
// const rhsB = new Int32Array(K * M).fill(0.0).map((_, i) => rhsA[i]);
// const resultB = new Int32Array(N * M).fill(0.0);

const lhsB = new Uint8ClampedArray(N * K).fill(0.0).map((_, i) => lhsA[i]);
const rhsB = new Uint8ClampedArray(K * M).fill(0.0).map((_, i) => rhsA[i]);
const resultB = new Uint8ClampedArray(N * M).fill(0.0);

function typedArrayMultiply() {
  resultB.fill(0.0);
    for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      for (let k = 0; k < K; k++) {
        // 全てのkについて　Lik * Rkj　の和が resultAのij
        resultB[K + i + j] += lhsB[N * i + k] * rhsB[M * k + j];
      }
    }
  }
}

const TEST_TIMES = 100;
const TESTS = [arrayMultiply, typedArrayMultiply];
function test(fn) {
  let result;
  for (let i = 0; i < TEST_TIMES; ++i) {
    result = fn();
  }
  return result;
}

// warmup
for (let i = 0; i < TESTS.length; ++i) {
  test(TESTS[i]);
}

// 測定開始
for (let i = 0; i < TESTS.length; ++i) {
  const start = performance.now();
  test(TESTS[i]);
  const end = performance.now();
  console.log(`${TESTS[i].name}: ${end - start}`);
}
