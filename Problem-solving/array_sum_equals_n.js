// Find all possible pairs in array whose sum equals 7
var a = [1,4,3,6,7,3,4,8,2,9,6,3,4,1,-3,-6,-4,11,5];
var n = 7;

a =  a.sort((a, b) => a-b);
console.log('Sorted a : ', a);

var pairs = [];
var i = 0;
var j=a.length-1;
console.log(i,j);
while (i < j) {
  // console.log(a[i], a[j]);
  if(a[i] + a[j] > n) {
    j--;
  } else if(a[i] + a[j] < n) {
    i++;
  }
  else {
    pairs.push({
      [i]: a[i],
      [j]: a[j]
    });
    i++;
    j--;
  }
}

console.log(a, pairs);
