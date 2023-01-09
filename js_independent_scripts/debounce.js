var debounce = function(fn, tm) {
  let timeOut = null;
  return function(...args) {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      fn(...args);
      clearTimeout(timeOut);
    }, tm);
  }
}

function test(val) {
  console.log(val);
}

test(1);
test(2);
test(3);

const debounceHandled = debounce(test, 2000);
debounceHandled(1);
debounceHandled(2);
debounceHandled(5);
