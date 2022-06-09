var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;

function MyPromise(fn) {
  const handler = {};
  let state = PENDING;
  let value = null;

  function fulfill(result) {
    if(state !== PENDING)
      return;
    state = FULFILLED;
    value = result;
    // console.log('Inside promise fulfill: ' + result);
    if(handler.onFullfilled != null) // handling the case when promise got over after calling then
      handler.onFullfilled(value);
  }

  function reject(error) {
    if(state !== PENDING)
      return;
    state = REJECTED;
    value = error;
    // console.log('Inside promise reject: ' + error);
    if(handler.onRejected != null) // handling the case when promise got over after calling then
      handler.onRejected(value);
  }

  this.then = (onFullfilled, onRejected) => {
    handler.onFullfilled = onFullfilled;  
    handler.onRejected = onRejected;
    this.callHandler();
  }

  this.callHandler = () => {
    // handling the case when promise got over before calling then
    if(state !== PENDING){
      if (state === FULFILLED)
        handler.onFullfilled(value);
      else
        handler.onRejected(value);
    }
  }

  // Call function as soon as Promise is created
  fn(fulfill, reject);

}

const p = new MyPromise((resolve, reject) => {
  console.log('Async call start');
  setTimeout(() => {
    resolve('Async call end');
    reject('Some error in async call');
  }, 5000);
});

setTimeout(() => {
  p.then((res) => {
    console.log(res);
  },
  (err) => {
    console.log(err);
  });
  console.log("p.then called");
}, 1000); // Modify time to call then before or after promise resolve time
