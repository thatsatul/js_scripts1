// https://nodejs.org/de/docs/guides/event-loop-timers-and-nexttick/

const fs = require('fs');

fs.readFile('./timer_2s.js', () => {
  setImmediate(() => {
    console.log('setImmediate: Usually this happens in the check phase which immediately runs after the poll phase in which file operations are done.');
  });

  process.nextTick(() => {
    console.log('process.nextTick : This will run immediately after current operation is done irrespective of any phase.');
  });
});
