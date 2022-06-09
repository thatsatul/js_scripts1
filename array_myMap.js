Array.prototype.myMap = function(cb) {
  // return this;
  for(i = 0; i< this.length; i++) {
    this[i] = cb(this[i], i);
  }
};

const arr = [1,2,3];
arr.myMap((val, i) => {
  return val * 2;
});
console.log(arr);
