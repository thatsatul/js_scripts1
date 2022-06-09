console.log(this); // while running as script in node js, this will be undefined

let bool = true;
let counter = 0;

setTimeout(() => {
  bool = false;
}, 2000)

// // what will happen below: will it stop or run infinite
// while(bool) {
//   console.log(counter++);
// }

// what will happen below: will it stop or run infinite
const tmInv = setInterval(() => {
  if (bool) {
    console.log(counter++);
  } else {
    clearInterval(tmInv);
  }
}, 100);

const obj = {
  sample: 1,
  normalFunc: function() {
    return this;
  },
  arrowFunc: () => {
    console.log('** this scope in obj arrowFunc **', this);
    return this;
  }
}

const a = obj.normalFunc;
const b = obj.arrowFunc;

console.log('obj.normalFunc().sample', obj.normalFunc().sample);
console.log('a().sample', a().sample);
console.log('obj.arrowFunc().sample', obj.arrowFunc().sample);
console.log('b().sample', b().sample);
