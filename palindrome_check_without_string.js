// Given an integer x, return true if x is palindrome integer.

// An integer is a palindrome when it reads the same backward as forward. For example, 121 is palindrome while 123 is not.

// Example 1:

// Input: x = 121
// Output: true
// Example 2:

// Input: x = -121
// Output: false
// Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
// Example 3:

// Input: x = 10
// Output: false
// Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
// Example 4:

// Input: x = -101
// Output: false

// One solution is converting number to string : easy
// Other solution is by not converting number to string: implemented below

/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  // console.log(x);
  if (x < 0) {
    return false;
  }
  let xCopy = x;
  let numLength = 0;
  while(xCopy > 0) {
    numLength++;
    // console.log(xCopy);
    xCopy = parseInt(xCopy / 10);
  }
  // console.log(numLength);
  while (x > 0) {
    const iLast = x % 10;
    const iFirst = parseInt(x / Math.pow(10, numLength - 1));
    // console.log(iLast, iFirst);
    if (iLast !== iFirst) {
      return false;
    }
    // console.log(x);
    x = parseInt(x / 10);
    x = x % Math.pow(10, numLength - 2);
    numLength = numLength - 2;
    // console.log(x);
  }
  return true;
};

console.log(isPalindrome(5));
console.log(isPalindrome(0));
console.log(isPalindrome(10));
console.log(isPalindrome(121));
