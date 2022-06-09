// https://nodejs.org/api/globals.html#globals_event

// Event : present in browser
// console.log(Event);
// console.log(EventTarget)

// URL and URLSearchParams
console.log(URL);
console.log(URLSearchParams);

// TextEncoder and TextDecoder
const encoder = new TextEncoder();
const uint8array = encoder.encode('this is some data');
console.log(uint8array);

// below functions
console.log(setTimeout);
console.log(clearTimeout);
console.log(setInterval);
console.log(clearInterval);
console.log(setImmediate);
console.log(clearImmediate);

// process
console.log(process.nextTick);

// global
console.log(global);

// Error
console.log(Error);
