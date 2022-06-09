let myObj1 = {
  price: 40,
  getPrice: function() {
    return this.price;
  }
}
console.log(myObj1.getPrice());
let customObj1 = Object.create(myObj1); // 40
customObj1.price = 30;
console.log(customObj1.getPrice()); // 30
delete customObj1.price;
console.log(customObj1.getPrice()); // 40

// this is not bound by arrow function below

let myObj = {
  price: 49,
  // getPrice: function() {
  getPrice: () => {
    return this.price;
  }
}
console.log(myObj.getPrice());
let customObj = Object.create(myObj);
customObj.price = 19;
console.log(customObj.getPrice());
delete customObj.price;
console.log(customObj.getPrice());
