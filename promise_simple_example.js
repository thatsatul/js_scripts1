const easyPromise = new Promise((resolve, reject) => {
  let x = 0;
  if (x === 0) {
    resolve('Ok');
  } else {
    reject('Error');
  }
});

// Directly using promise
easyPromise.then((res) => {
  console.log(res);
}, (err) => {
  console.log(err);
});

// Promise.resolve takes promise as parameter: Promise.resolve(<Promise Object>)
Promise.resolve(easyPromise).then((res) => {
  console.log(res);
}, (err) => {
  console.log(err);
});

// Promise.resolve takes primitive as parameter: Promise.resolve(<number value>)
Promise.resolve(1).then((res) => {
  console.log(res);
}, (err) => {
  console.log(err);
});

// Promise.reject takes promise as parameter: Promise.reject(<Promise Object>)
Promise.reject(easyPromise).then(res => {
  console.log(res);
}, (err) => {
  console.log(err);
});

// Promise.reject takes primitive as parameter: Promise.reject(<number value>)
Promise.reject(1).then((res) => {
  console.log(res);
}, (err) => {
  console.log(err);
});


// Function returning values wrapped in Promises
function getPromiseSuccess(returnPromiseSuccess) {
  if (returnPromiseSuccess) {
    return Promise.resolve('Success');
  } else {
    return Promise.reject('Failed');
  }
}

getPromiseSuccess(true).then(res => console.log(res)).catch(err => console.log(err));
