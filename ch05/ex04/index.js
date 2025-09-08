// while
export function fibWhile() {
  let fib = [];
  let a = 0,
    b = 1,
    i = 0;
  while (i < 10) {
    [a, b] = [b, a + b];
    fib[i] = a;
    i++;
  }
  return fib;
}

// do while
export function fibDoWhile() {
  let fib = [];
  let a = 0,
    b = 1,
    i = 0;
  do {
    [a, b] = [b, a + b];
    fib[i] = a;
    i++;
  } while (i < 10);
  return fib;
}

// for
export function fibFor() {
  let fib = [];
  let a = 0,
    b = 1;
  for (let i = 0; i < 10; i++) {
    [a, b] = [b, a + b];
    fib[i] = a;
  }
  return fib;
}

// 再帰的に解く
// export function fib(n) {
//   if (n <= 1) return n;
//   return fib(n - 1) + fib(n - 2);
// }

console.log(fibWhile(10));
console.log(fibDoWhile(10));
console.log(fibFor(10));
