var f = {};
console.log('Start time', Date.now());
function fib(n) {
  if(n <= 0) {
    return 0;
  } else if(n === 1) {
    return 1;
  } else if(f[n]) {
    return f[n];
  } else {
    // Code for memoization
    // f[n] = fib(n-2) + fib(n-1);
    // return f[n];
    return fib(n-2) + fib(n-1);
  }
} 
console.log(fib(44));
console.log('End time', Date.now());
