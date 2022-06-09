// Maximum sum of i*arr[i] among all rotations of a given array
// Given an array arr[] of n integers, find the maximum that maximizes sum of value of i*arr[i] where i varies from 0 to n-1.

// Examples :

// Input : arr[] = {8, 3, 1, 2}
// Output : 29
// Explanation : Let us see all rotations
// {8, 3, 1, 2} = 8*0 + 3*1 + 1*2 + 2*3 = 11
// {3, 1, 2, 8} = 3*0 + 1*1 + 2*2 + 8*3 = 29
// {1, 2, 8, 3} = 1*0 + 2*1 + 8*2 + 3*3 = 27
// {2, 8, 3, 1} = 2*0 + 8*1 + 3*2 + 1*1 = 17

// Input : arr[] = {3, 2, 1}
// Output : 7

var arr = [8, 3, 1, 2];
var n = arr.length;
function maxSum() {
  // Compute sum of all array elements
  // Compute sum of i*arr[i] for initial configuration.
  var elms_sum = 0;
  var curr_val = 0;
  for (i = 0; i < n; i++) {
    elms_sum += arr[i];
    curr_val += i * arr[i];
  }
  console.log('******Sum with rotation****** ', 0, curr_val);

  // Initialize result
  var res = curr_val;

  // Compute values for other iterations - rotating LEFT
  // for (i = 1; i < n; i++)
  // {
  //   // Compute next value using previous value in O(1) time
  //   next_val = curr_val - (elms_sum - arr[i - 1]) + (arr[i - 1] * (n - 1)); // This is the basic formula
  //   console.log('******Sum with rotation****** ', i, next_val);
  //   // Update current value
  //   curr_val = next_val;

  //   // Update result if we get max sum
  //   res = Math.max(res, next_val);
  // }

  // Compute values for other iterations - rotating RIGHT
  for (j=1; j<n; j++) 
    { 
      curr_val = curr_val + elms_sum - (n * arr[n-j]);
      console.log('******Sum with rotation****** ', j, curr_val); // This is the basic formula
      res = Math.max(res, curr_val);
    }

  return res;
}

console.log('********* Maximum Sum ********', maxSum());
