
// Normal axios
const axios = require('axios');
const fetch = require("node-fetch");

axios({
  method: 'get',
  url: 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY',
})
  .then(response => {
    console.log('********* Implementing normal axios *********');
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });


//Async and await
let promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("done!"), 1000)
});
async function f() {
  let result = await promise; // wait until the promise resolves (*)
  console.log(result); // "done!"
}

f();


// Implementing async-await with axios
const get = () => {
  return axios({
    method: 'get',
    url: 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY',
  });
}

async function f1() {
  let response = await get(); // wait until the promise resolves (*)
  console.log('********* Implementing async-await with axios *********', response.data); // "done!"
}

f1();


// Implementing fetch with async-await
// Example POST method implementation:
async function getData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
  return response.json();
}

getData('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
  .then(response => {
    console.log('********* Implementing async-await with fetch *********', response);
    console.log(response); // JSON data parsed by `response.json()` call
  })
  .catch(err => console.log('******* ERROR ******', err));
