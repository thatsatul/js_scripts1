// https://medium.com/@copperwall/implementing-promise-all-575a07db509a

Promise.all = function promiseAllIterative(values) {
  return new Promise((resolve, reject) => {
    let results = [];
     
    values.forEach((value, index) => {
      value.then(result => {
        console.log(Date.now());
        results[index] = result;
        
        if (results.length === values.length) {
          resolve(results);
        }
        // Change below 6 for getting error
        if (results.length === 6) {
          reject('Error');
        }
      });
    });
  });
}

const promise1 = new Promise((resolve, reject) => {
  const tmOut = setTimeout(() => {
    resolve('P1');
    clearTimeout(tmOut);
  }, 1000);
});

const promise2 = new Promise((resolve, reject) => {
  const tmOut = setTimeout(() => {
    resolve('P2');
    clearTimeout(tmOut);
  }, 2000);
});

const promise3 = new Promise((resolve, reject) => {
  const tmOut = setTimeout(() => {
    resolve('P3');
    clearTimeout(tmOut);
  }, 5000);
});

// const promise4 = new Promise((resolve, reject) => {
//   const tmOut = setTimeout(() => {
//     reject('P4');
//     clearTimeout(tmOut);
//   }, 1000);
// });

console.log(Date.now());
const allPromisesResults = Promise.all([promise1, promise2, promise3]).then(values => console.log(values, Date.now())).catch(err => console.log(err));
