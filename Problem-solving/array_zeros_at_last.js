// Move all zeroes to end of array
// https://www.geeksforgeeks.org/move-zeroes-end-array/

// arr = [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1];
// arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0];

var arr = [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1];

function swap() {
  console.log('********Initial array*******', arr);
  let i = 0;
  let j = arr.length - 1;
  while (i < j) {
    if (arr[i] === 0 && arr[j] === 1) {
      arr[i] = 1;
      arr[j] = 0;
      i++;
      j--;
    }
    else if (arr[i] === 1 && arr[j] === 0) {
      i++;
      j--;
    }
    else if (arr[i] === 1 ) {
      i++;
    }
    else if(arr[j] === 0) {
      j--;
    }
  }
  console.log('********Final array*******', arr);
}

swap();
