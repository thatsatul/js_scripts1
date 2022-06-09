// "use strict";

var person = {};
Object.defineProperty(person, "name", {
  writable: false,
  value: "Nicholas"
});
console.log(person.name);
person.name = "Greg"; // use strict throws error here
console.log(person.name);



var person1 = {};
Object.defineProperty(person1, "name", {
  configurable: false,
  value: "Ram",
});
console.log(person1.name); //”Nicholas”
delete person1.name; // use strict throws error here
console.log(person1.name); //”Nicholas”