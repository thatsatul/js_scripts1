// https://medium.com/@copperwall/implementing-promise-all-575a07db509a

Promise.all = function promiseAllReduce(values) {
  return values.reduce((accumulator, value) => {
      return accumulator.then(results => {
          return value.then(result => {
              console.log(Date.now());
              return [...results, result];
          });
      });
  }, Promise.resolve([]));
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
