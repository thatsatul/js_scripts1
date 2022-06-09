// https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#what-is-the-event-loop
// https://nexocode.com/blog/posts/behind-nodejs-event-loop/#:~:text=Pending%20callbacks%20%23,will%20run%20in%20this%20phase.

// timeout_vs_immediate.js : Can return in any sequence
setTimeout(() => {
  console.log('timeout');
}, 0);

setImmediate(() => {
  console.log('immediate');
});


// In below case, immediate will always run first as its called immediately after poll phase in check phase.
// Then when timer phase enters, timeout will be called.

const fs = require('fs');

fs.readFile('./timer_2s.js', () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0);
  setImmediate(() => {
    console.log('immediate');
  });
});
