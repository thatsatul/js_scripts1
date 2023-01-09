const compare = (a, b) => a.val - b.val; // ascending

const arr = [
  {val: 31},
  {val: 52},
  {val: 12},
  {val: 22},
  {val: 9},
  {val: 17},
];

const sortedArr = arr.sort(compare);
console.log('******* Original Array ********', arr);
console.log('******* Sorted Arr *******', sortedArr);
