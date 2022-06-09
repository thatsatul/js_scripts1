// https://betterprogramming.pub/is-node-js-really-single-threaded-7ea59bcc8d64

process.env.UV_THREADPOOL_SIZE = 4; // Change it to 4 and 5 to see last function call time difference
// If we have 4 core and 5 thread pool size, the threads run together with a concept called context switching
const crypto = require("crypto");
const start = Date.now();

function logHashTime() {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    console.log("Hash: ", Date.now() - start);
  });
}
logHashTime();
logHashTime();
logHashTime();
logHashTime();
logHashTime();
console.log('LIBUV Threads: ', process.env.UV_THREADPOOL_SIZE);
