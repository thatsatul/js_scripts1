// Given a sorted array and a number x, find a pair in array whose sum is closest to x.
// Examples:

// Input: arr[] = {10, 22, 28, 29, 30, 40}, x = 54
// Output: 22 and 30

// Input: arr[] = {1, 3, 4, 7, 10}, x = 15
// Output: 4 and 10

var arr = [1, 3, 4, 7, 10];
var n = 15;

var pair = {
  diff: null,
  i: null,
  j: null,
};
var i = 0;
var j=arr.length-1;
while (i < j) {
  if(Math.abs(n - (arr[i] + arr[j])) <= pair.diff || !pair.diff) {
    pair.i = i;
    pair.j = j;
    pair.diff = Math.abs(n - (arr[i] + arr[j]));
  }
  if(arr[i] + arr[j] > n) {
    j--;
  } else if(arr[i] + arr[j] < n) {
    i++;
  } else if(arr[i] + arr[j] == n) {
    break;
  }
}

console.log('******* Array ********', arr);
console.log('******* Given number ********', n);
console.log('******* Pair ********', arr[pair.i], arr[pair.j]);
console.log('******* Sum Closest ********', arr[pair.i] + arr[pair.j]);
