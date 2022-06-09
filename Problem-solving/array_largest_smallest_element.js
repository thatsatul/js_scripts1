var arr1 = [12, 43, 54, 13, 16, 19, 67];
var arr2 = [23, 52, 43, 16, 73, 92, -13, -10, 34];

function find(arr) {
  var largest = null;
  var smallest = null;
  for (i=0; i<arr.length; i++) {
    if(largest == null) {
      largest = arr[i];
    }
    if(smallest == null) {
      smallest = arr[i];
    }
    largest = Math.max(largest, arr[i]);
    smallest = Math.min(smallest, arr[i]);
  }
  console.log('********largest*******', arr, largest);
  console.log('********Smallest*******', arr, smallest);
}

find(arr1);
find(arr2);
