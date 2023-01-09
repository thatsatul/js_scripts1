// https://medium.com/javascript-in-plain-english/proto-vs-prototype-in-js-140b9b9c8cd5

const obj1 = {
  a: 1
};
console.log('**** obj1.prototype ****', obj1.prototype); // undefined
console.log('**** obj1.__proto__ ****', obj1.__proto__); // {}

function Fun() {
  this.b = 1;
}
Fun.prototype.c = 2;
console.log('**** fun.prototype ****', Fun.prototype); // fun {}
console.log('**** fun.__proto__ ****', Fun.__proto__); // function () { [native code] }


// funInst.__proto__ = Fun.prototype at time of creation
// Fun.prototype is different from  Fun.__proto__

var funInst = new Fun();
console.log('**** funInst.prototype ****', funInst.prototype); // undefined
console.log('**** funInst.__proto__ ****', funInst.__proto__); // fun {}

var str = 'Abc';
console.log('**** str.prototype ****', str.prototype); // undefined
console.log('**** str.__proto__ ****', str.__proto__); // [String: '']

var str1 = new String('Abc');
console.log('**** str.prototype ****', str1.prototype); // undefined
console.log('**** str.__proto__ ****', str1.__proto__); // [String: '']

var bool = true;
console.log('**** bool.prototype ****', bool.prototype); // undefined
console.log('**** bool.__proto__ ****', bool.__proto__); // [Boolean: false]
