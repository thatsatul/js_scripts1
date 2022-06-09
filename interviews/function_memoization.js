function fib(n) {
	if(n < 1) {
  	return 1;
  }
  return fib(n-1) + fib(n-2);
}

function sum(a, b) {
	return a + b;
}

const memofib = memoize(fib);
const memosum = memoize(sum);

function memoize(fn) {
	const mem = {};
	return function(...args) {
  	const argsLength = args.length;
    // unique key
    const key = args.reduce((str, x) => str + '_' + x, '');
  	if (mem[key]) {
    	console.log('Consoling in memoize from cache', mem[key]);
    	return mem[key];
    }
  	mem[key] = fn(...args);
    return mem[key];
  }
}

console.log('Not cached', memofib(5));
console.log('Cached', memofib(5));

console.log('Not cached', memosum(1,2));
console.log('Cached', memosum(1,2));
