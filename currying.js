// ********* Closure ***********

function addition(a, b, c, d, e) {
  return a + b + c + d + e;
}

addition(4, 3, 3, 2, 1);

function outer() {
  let sum = 0;
  return function (val) {
    sum = sum + val;
    return sum;
  }
}

const out = outer();
out(4);
out(3);
out(3);
out(2);
out(1);

// ********** Currying ************ //

function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };
}


function sum(a, b, c, d, e) {
  return a + b + c + d + e;
}

function getName (fn,ln){
  return fn + ln;
} 

const addition1 = curry(sum);

const fullName = curry(getName);

let sol = null;

//00
sol = fullName('sam')('dean');
console.log(sol);

//01
sol = addition1(4, 3, 3, 2, 1);
console.log(sol);

//02
sol = addition1(4)(3)(3)(2)(1);
console.log(sol);

//03
sol = addition1(4, 3, 3)(2)(1);
console.log(sol);
