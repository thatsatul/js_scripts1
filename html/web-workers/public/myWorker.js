// Adding a heavy operation for testing
function fibonacci(n) {
  if (n <= 1) {
    return 1;
  }
  const res = fibonacci(n - 1) + fibonacci(n - 2)
  return res;
}


self.addEventListener('message', (msg) => {
  const num = msg.data;
  const res = fibonacci(num);
  self.postMessage(res);
});
