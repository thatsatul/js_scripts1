console.log('******** Array instanceof Object ********', Array instanceof Object);

var sampleArr = ["red", "blue","green"]; //creates an array with three strings
var sampleArr1 = new Array(3); //create an array with three items
var sampleArr2 = Array(3); //create an array with three items

console.log('***** sampleArr instanceof Array *****', sampleArr instanceof Array);
console.log('***** sampleArr1 instanceof Array *****', sampleArr1 instanceof Array);
console.log('***** sampleArr2 instanceof Array *****', sampleArr2 instanceof Array);

// instanceof operator has an issue so Array.isArray() is introduced - wrox professional JS book page 110

console.log('***** Array.isArray(sampleArr) *****', Array.isArray(sampleArr));
console.log('***** Array.isArray(sampleArr1) *****', Array.isArray(sampleArr1));
console.log('***** Array.isArray(sampleArr2) *****', Array.isArray(sampleArr2));

// ************* Playing with length property *************
var sample = [1, 2, 3, 4];
console.log('******* sample array ********', sample);
console.log('******* sample.length ********', sample.length);
sample.length = 2;
console.log('******* sample.length set to 2 ********', sample);
sample.length = 6;
console.log('******* sample.length set to 6 ********', sample);

// *************Array Push and Pop *************************
var sample = [1,2];
sample.push([3,4]);
console.log(sample);

// ************* ARRAY METHODS ***************************************************************

// ************ Array conversion methods ***************

var sample1 = ["red", "blue", "green"]; //creates an array with three strings
console.log('******** sample1 ********', sample1);
console.log('******** sample1.toString() ********', sample1.toString()); //red,blue,green
console.log('******** sample1.valueOf() ********', sample1.valueOf()); //red,blue,green

var arr = [1, 2, 3, 4, 5, 6, 7];

// Stack methods: Push and Pop
var count = arr.push("red", "green");
console.log('****** var count = arr.push("red", "green") : So count is ********', arr, count); // 2
count = arr.push("black");
console.log('****** count = arr.push("black") : push returns the new array length ********', arr, count); //3
var item = arr.pop();
console.log('********* var item = arr.pop() : pop returns the popped item ******** ', arr, item); //"black"


// Queue methods: Shift and Unshift
count = arr.unshift("b", "c");
console.log('****** var count = arr.unshift(b, c) : So count is ********', arr, count); // 2
count = arr.unshift("qqq");
console.log('****** count = arr.unshift("qqq") : unshift returns the new array length ********', arr, count); //3
item = arr.shift();
console.log('********* var item = arr.shift() : shift returns the popped item ******** ', arr, item); // qqq

// Reordering methods : sort and reverse
function compare(value1, value2){
  return value1 - value2; // For ascending order
}
var arr1 = [10, 6, 4, 33, 5, 2, 8];
console.log('********* arr1.sort() : values are sorted on basis of string **********', arr1.sort());
console.log('********* arr1.sort(compare) : numeric sorting using compare function **********', arr1.sort(compare));
console.log('********* arr1.reverse() **********', arr1.reverse());

// Manipulation methods : concat, slice, splice
var colors = ["red", "green", "blue"];
var colors2 = colors.concat("yellow", ["black", "brown"]);
console.log('******** var colors2 = colors.concat("yellow", ["black", "brown"]) **********');
console.log('******** colors ********', colors); //red,green,blue
console.log('******** colors2 ********', colors2); //red,green,blue,yellow,black,brown


var colors = ["red", "green", "blue", "yellow", "purple"];
var colors2 = colors.slice(1);
var colors3 = colors.slice(1,4);
console.log('******** var colors2 = colors.slice(1); colors : **********', colors); //[ 'red', 'green', 'blue', 'yellow', 'purple' ]
console.log('******** var colors2 = colors.slice(1); colors2 : ********', colors2); //green,blue,yellow,purple
console.log('******** var colors3 = colors.slice(1,4); colors3 : ********', colors3);  //green,blue,yellow


var colors = ["red", "green", "blue"];
console.log('******** colors is *********', colors);
var removed = colors.splice(0,1); //remove the first item
console.log('******** var removed = colors.splice(0,1) : colors is *********', colors); //green,blue
console.log('******** var removed = colors.splice(0,1) : removed is *********', removed);
removed = colors.splice(1, 0, "yellow", "orange"); //insert two items at position 1
console.log('******** removed = colors.splice(1, 0, "yellow", "orange") : colors is *********', colors);
console.log('******** removed = colors.splice(1, 0, "yellow", "orange") : removed is *********', removed);
removed = colors.splice(1, 1, "red", "purple");
console.log('******** removed = removed = colors.splice(1, 1, "red", "purple"); : colors is *********', colors); //green,red,purple,orange,blue
console.log('******** removed = removed = colors.splice(1, 1, "red", "purple"); : removed is *********', removed); //yellow - one item array

var numbers = [1,2,3,4,5,4,3,2,1];
console.log('******* numbers, numbers.indexOf(4) ********', numbers, numbers.indexOf(4)); //3
console.log('******* numbers, numbers.lastIndexOf(4) ********', numbers, numbers.lastIndexOf(4)); //5

// Iterative Methods : every, some, map, foreach, filter

var numbers = [1,2,3,4,5,4,3,2,1];
var everyResult = numbers.every(function(item, index, array){
  return (item > 2);
});
console.log('******** every(): returns false if any item <= 2 *********', numbers, everyResult); // false
var someResult = numbers.some(function(item, index, array){
  return (item > 2);
});
console.log('******** some(): returns true is any item > 2  *********', numbers, someResult); //true
var filterResult = numbers.filter(function(item, index, array){
  return (item > 2);
});
console.log('******** filter(): returns all items > 2 *********', numbers, filterResult); //[3,4,5,4,3]
var mapResult = numbers.map(function(item, index, array){
  return item * 2;
});
console.log('******** map(): multiply each item by 2 *********', numbers, mapResult); //[2,4,6,8,10,8,6,4,2]
var forEachResult = [];
numbers.forEach(function(item, index, array){
  forEachResult.push(item + 1);
});
console.log('******** foreach(): add 1 to each item *********', numbers, forEachResult);

// ************** Reduction Method : reduce and reduceRight *************

var values = [1,2,3,4,5];
var sum = values.reduce(function(prev, cur, index, array){
  return prev + cur;
});
console.log('**********values , values.reduce to get sum **********', values, sum); //15

var sum = values.reduceRight(function(prev, cur, index, array){
  return prev + cur;
});
console.log('**********values , values.reduceRight to get sum **********', values, sum); //15
