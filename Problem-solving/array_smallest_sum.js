// Given an array of distinct integers arr[], the task is to find a pair which has the minimum sum and print the sum.

// Examples:

// Input: arr[] = {1, 2, 3, 5, 7}
// Output: 3
// The pair (1, 2) will have the minimum sum pair i.e. 1 + 2 = 3

// Input: arr[] = {3, 5, 6, 2}
// Output: 5

var arr = [3, 5, 6, 2];
let min = Infinity;
let secondMin = Infinity;
function findSmallestSum(arr) {
  for (i = 0; i <= arr.length; i++) {
    if(arr[i] < min) {
      secondMin = min;
      min = arr[i];
    }
    if(arr[i] > min && arr[i] <= secondMin) {
      secondMin = arr[i];
    }
  }
}

findSmallestSum(arr);

console.log('****** Array ******', arr);
console.log('****** Smallest Sum ******', min + secondMin);
