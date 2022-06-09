var num = 56437;
var numArr = num.toString().split('');
var newNum = num;
var numLen = numArr.length;

console.log('****** Original Number *******', num);
for (i = 1; i < numLen; i++ ) {
  var first = parseInt(numArr[0]); // 5
  newNum = newNum * 10; // 564370
  newNum = newNum + first; // 564375
  newNum = newNum - (first * Math.pow(10, numLen)); // 64375
  console.log('***** Number after rotation ********', i, newNum);
  numArr = newNum.toString().split('');
}
