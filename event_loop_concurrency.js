console.log(1);

console.log(2);

console.log(3);

console.log(4);

const st = setTimeout(() => {
  console.log(5)
}, 200);

const st1 = setTimeout(() => {
  console.log(6);
  clearTimeout(st1);
}, 0);

const st2 = setTimeout(() => {
  console.log(7);
  clearTimeout(st2);
}, 0);

const st3 = setTimeout(() => {
  console.log(8);
  clearTimeout(st3);
}, 0);

console.log(9);
