// ***** Question: It should print in the sequence as instances are declared: like b done should be called after a done *****

class Job {
  constructor(fn, jobs = []) {
    let job = function(resolve, reject){
      fn(()=> {console.log("Empty finish() call")});
    }
    if (jobs.length == 0) {
      return new Promise(() => {fn(()=> {console.log("empty method happened!!!");});});
    } else {
      return Promise.all(...jobs).then(fn(()=> {console.log("empty method happened!!!");}));
    }
  }
}

let a = new Job(function (finish) {
  setTimeout(function () {
    console.log('a done');
    console.log(new Date().getTime());
    finish();
  }, 200);
}, [])

let b = new Job(function (finish) {
  setTimeout(function () {
    console.log('b done');
    console.log(new Date().getTime());
    finish();
  }, 50);
}, [a])

let c = new Job(function (finish) {
  setTimeout(function () {
    console.log('c done');
    console.log(new Date().getTime());
    finish();
  }, 300);
}, [b])

let d = new Job(function (finish) {
  setTimeout(function () {
    console.log('d done');
    console.log(new Date().getTime());
    finish();
  }, 1000);
}, [a, b])

let e = new Job(function (finish) {
  setTimeout(function () {
    console.log('e done');
    console.log(new Date().getTime());
    finish();
  }, 2000);
}, [d])