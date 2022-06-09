// ************ Undefined type ***************
var message; // this variable is declared but has a value of undefined
// make sure this variable isn’t declared
// var age - age is never declared
console.log('***var message***', message); // ”undefined”
// console.log(age); // causes an error when running the script

console.log('***typeof message***', typeof message);  // ”undefined”
console.log('***typeof age***', typeof age);      // ”undefined”


// *************** Null ********************
// undefined is a derivative of null
console.log('null === null', null === null);
console.log('***typof null***', typeof null);
console.log('***null == undefined***', null == undefined);
console.log('***null === undefined***', null === undefined);

// ************** NaN and isNaN ****************
console.log('********NaN == Nan******', NaN == NaN); //false

console.log('******** isNaN(NaN) ********', isNaN(NaN)); //true
console.log('******** isNaN(10) ********', isNaN(10)); //false - 10 is a number
console.log('******** isNaN(“10”) ********', isNaN("10")); //false - can be converted to number 10
console.log('******** isNaN(“blue”) ********', isNaN("blue")); //true - cannot be converted to a number
console.log('******** isNaN(true) ********', isNaN(true)); //false - can be converted to number 1


// ************* ParseInt **************
var num1 = parseInt("1234blue"); //1234 
var num2 = parseInt(""); //NaN
var num3 = parseInt("0xA"); //10 - hexadecimal
var num4 = parseInt(22.5); //22
var num5 = parseInt("70"); //70 - decimal
var num6 = parseInt("0xf"); //15 - hexadecimal

// ********** with statment *********
var location = {
  search: 'sample',
  hostname: 'Dummy_host',
  href: 'Dummy_url',
}
with(location){
  var qs = search.substring(1);
  var hostName = hostname;
  var url = href;
};
console.log('***** qs, hostName, url *****', qs, hostName, url);
