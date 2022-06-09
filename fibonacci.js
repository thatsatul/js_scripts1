function fibonacci(n) {
  if (n <= 1) {
    return 1;
  }
  const res = fibonacci(n - 1) + fibonacci(n - 2)
  return res;
}

const num = 45;
console.log('** Fibonacci operation starts **', Date.now());
console.log(fibonacci(num));
console.log('** Fibonacci operation ends **', Date.now());
