// The following recursive code will cause a stack overflow if num is too large. How can you fix this and still retain the recursive pattern?

let num = 9999999999999999999999;
let item = 1;

var nextListItem = function() {
  if(item >= num) {
    return item;
  }
  else {
    console.log(item);
    item += 1;
    nextListItem();
  }
};

// Solution below

// var nextListItem = function() {
//   if(item >= num) {
//     return item;
//   }
//   else {
//     console.log(item);
//     item += 1;
//     setTimeout(nextListItem, 0);
//   }
// };

nextListItem(1);
