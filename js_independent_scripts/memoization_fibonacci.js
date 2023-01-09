const num = 45;

function fibonacci(n) {
  if (n <= 1) {
    return 1
  }
  return fibonacci(n - 1) + fibonacci(n - 2)
}

// Applying memoization to same fibonacci function
function fibonacci_memo(n, memo) {
  memo = memo || {}
  if (memo[n]) {
    return memo[n]
  }
  if (n <= 1) {
    return 1
  }
  return memo[n] = fibonacci_memo(n - 1, memo) + fibonacci_memo(n - 2, memo)
}

console.log('**** Start *****', new Date());
var f1 = fibonacci(num);
console.log('**** Normal Fibonacci ends for num = ', num, f1, new Date());
var f2 = fibonacci_memo(num);
console.log('**** Memoized fibonacci ends for num = ', num, f2, new Date());

// ****** AMAZING RESULT *******
// CSI-0032:js_scripts aanand$ node memonaization_fibonacci.js 
// **** Start ***** 2019-06-30T08:48:00.468Z
// **** Normal Fibonacci ends for num =  45 1836311903 2019-06-30T08:48:13.407Z // 13 s 
// **** Memoized fibonacci ends for num =  45 1836311903 2019-06-30T08:48:13.408Z // 1 ms
// CSI-0032:js_scripts aanand$ 
