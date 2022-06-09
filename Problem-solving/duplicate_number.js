// Find duplicate number and missing number in an array from 1 to number
// We are assuming that only one number is missing and one is repeated from 1 to n
// [2,1,4,4]
// 1 to n : [1,2,3,4]
let hash = {};
let totalSum = 0;
let expectedSum = 0;
function duplicate(arr) {
  for(let i = 0; i<arr.length; i++) {
    totalSum = totalSum + arr[i];
    expectedSum = expectedSum + (i + 1);
    if(hash[arr[i]]) {
      hash[arr[i]]++;
      duplicateNum = arr[i];
    } else {
      hash[arr[i]] = 1;
    }
  }
  let diff = totalSum - expectedSum;
  missing = duplicateNum - diff;
  console.log('Missing, duplicate', missing, duplicateNum);
}


duplicate([1,2,3,3,5]);
