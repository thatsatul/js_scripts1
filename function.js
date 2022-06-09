// *********** arguments keyword **********
function howManyArgs(a, b, c, d, e) {
  console.log('** arguments.length**', arguments.length);
  console.log('** arguments **', arguments);
  console.log('** func.length **', howManyArgs.length);
}
howManyArgs("string", 45); //2
howManyArgs(); //0
howManyArgs(12); //1

// keys assigned to this are only accessible via instance
function Test() {
  this.x = 1;
  console.log('** this.x **', this.x);
}

var testInstance = new Test(); 

console.log(Test.x); // undefined
console.log(testInstance.x); // 1



console.log('Checking function repetitve call : callMe');
function callMe(k) {
  console.log('** Call me **');
  console.log(this.a);
  this.a = k;
  console.log(this.a);
}

// Normal call will give reference error as this will be undefined
// callMe(1);
// callMe(2);

const in1 = new callMe(111);
const in2 = new callMe(999);
