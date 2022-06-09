console.log('script loaded');

var myWorker = new Worker('./myWorker.js');

const btnEl = document.getElementById('heavy_op');
btnEl && btnEl.addEventListener('click', () => {
  console.log('** Fibonacci operation starts **', Date.now());
  myWorker.postMessage(45);
  // const res = fibonacci(45);
  // console.log('** Fibonacci operation ends **', Date.now(), res);
  console.log('** Code after Fibonacci operation **');
});

myWorker.addEventListener('message', (msg) => console.log('** Fibonacci operation ends **', Date.now(), msg.data));
