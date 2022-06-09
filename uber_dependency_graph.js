// type PropsType ={
//     fn:(callback)=>void,
//     jobs:Job[]
// }
//Async dependency graph

// ***** Question: It should print in the sequence as instances are declared: like b done should be called after a done *****

// class Job {
//   constructor(fn, jobs = []) {}
// }

// console.log(new Date().getTime());

// let a = new Job(function (finish) {
//   setTimeout(function () {
//     console.log('a done');
//     console.log(new Date().getTime());
//     finish();
//   }, 100);
// }, [])

// let b = new Job(function (finish) {
//   setTimeout(function () {
//     console.log('b done');
//     console.log(new Date().getTime());
//     finish();
//   }, 200);
// }, [a])

// let c = new Job(function (finish) {
//   setTimeout(function () {
//     console.log('c done');
//     console.log(new Date().getTime());
//     finish();
//   }, 300);
// }, [b])

// let d = new Job(function (finish) {
//   setTimeout(function () {
//     console.log('d done');
//     console.log(new Date().getTime());
//     finish();
//   }, 1000);
// }, [a, b])

// let e = new Job(function (finish) {
//   setTimeout(function () {
//     console.log('e done');
//     console.log(new Date().getTime());
//     finish();
//   }, 2000);
// }, [d])

// Using setInterval: Not an optimal solution
class Job1 {
  constructor(fn, jobs = []) {
    this.isComplete = false;
    if(jobs.length <= 0) {
      fn(() => {
        this.isComplete = true;
      });
    } else {
      const inv = setInterval(() => {
        let allJobsFinished = true;
        jobs.forEach(jobIns => {
          console.log(jobIns.isComplete);
          if(!jobIns.isComplete) {
            allJobsFinished = false;
          }
          if(allJobsFinished) {
            clearInterval(inv);
            fn(() => {
              this.isComplete = true;
            });
          }
        });
      }, 99);
    }
  }
}

// Optimal solution
class Job {
  constructor(fn, jobs = []) {
    this.subscriptions = [];
    this.jobsCompleted = 0;
    this.handleSubscriptionsCall = function() {
      this.jobsCompleted = this.jobsCompleted + 1;
      if(this.jobsCompleted >= jobs.length) {
        fn(() => this.subscriptions.forEach(subscription => subscription.handleSubscriptionsCall()));
      }
    }
    if(jobs.length <= 0) {
      this.handleSubscriptionsCall();
    } else {
      jobs.forEach(job => job.subscriptions.push(this));
    }
  }
}

console.log(new Date().getTime());

let a = new Job(function (finish) {
  setTimeout(function () {
    console.log('a done');
    console.log(new Date().getTime());
    finish();
  }, 100);
}, [])

let b = new Job(function (finish) {
  setTimeout(function () {
    console.log('b done');
    console.log(new Date().getTime());
    finish();
  }, 200);
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
