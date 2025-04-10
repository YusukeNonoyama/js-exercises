export function fib(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;

  let second_last_value = 0;
  let last_value = 1;
  let current_value = 0;
  if (n > 1) {
    for (let i = 2; i <= n; i++) {
      current_value = last_value + second_last_value;
      
      second_last_value = last_value;
      last_value = current_value;
    }
    return current_value;
  }
}
