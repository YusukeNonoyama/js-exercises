export function fib(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;

  let two_before_value = 0;
  let one_before_value = 1;
  let current_value = 0;
  if (n > 1) {
    for (let i = n; i >= 2; i--) {
      current_value = one_before_value + two_before_value;

      two_before_value = one_before_value;
      one_before_value = current_value;
    }
    return current_value;
  }
}
