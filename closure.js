function passValue1(num1) {
  return function passValue2(num2) {
    return num1  * num2;
  }
}

var multiplyBy3 = passValue1(3);
var finalVal = multiplyBy3(5);
console.log('num1 = 3, num2 = 5, finalValue = ', finalVal );



const arr = [10, 12, 15, 21];
for (var i = 0; i < arr.length; i++) {
  // pass in the variable i so that each function 
  // has access to the correct index
  setTimeout(function(i_local) {
    return function() {
      console.log('The index of this number is: ' + i_local);
    }
  }(i), 3000);
}