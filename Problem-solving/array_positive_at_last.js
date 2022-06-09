// Move all negative numbers to beginning and positive to end with constant extra space
// An array contains both positive and negative numbers in random order. Rearrange the array elements so that all negative numbers appear before all positive numbers.

// Examples :

// Input : -12, 11, -13, -5, 6, -7, 5, -3, -6
// Output :-12 -13 -5 -7 -3 -6 11 6 5

var arr = [-12, 11, -13, -5, 6, -7, 5, -3, -6];

function swap() {
  console.log('****Initial Array****', arr);
  let i = 0;
  let j = arr.length - 1;
  let temp = null;
  while (i<j) {
    if(arr[i] > 0 && arr[j] < 0) {
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      i++;
      j--;
    }
    if(arr[i] < 0 && arr[j] > 0) {
      i++;
      j--;
    } else if(arr[i] < 0) {
      i++;
    } else if(arr[j] > 0) {
      j--;
    }
  }
  console.log('******Finsl Array******', arr);
}

swap();
