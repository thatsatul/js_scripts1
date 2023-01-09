// [1, 2, 3, 4, 5]
// Write a function myReduce such that
// arr.myReduce((accumulator, currentVal) => accumulator + currentVal);
// Result should be 15


const arr = [1, 2, 3, 4, 5];
Array.prototype.myReduce = function(cb, initial) {
  console.log(this);
  let final = initial;
  for(let i = 0; i < this.length; i++) {
    final = cb(final, this[i]);
  }
  return final;
};

const finalVal = arr.myReduce((accumulator, currentVal) => accumulator + currentVal, 0);
console.log('Final Val', finalVal);
