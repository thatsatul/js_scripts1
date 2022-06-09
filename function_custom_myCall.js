// Implement bind like functionality

Function.prototype.myCall = function(scope, ...args) {
  const bound = this.bind(scope);
  bound(...args);
}

const a = {
  val: 1,
  print: function(newVal) {
    console.log(this.val, newVal);
  }
};

function sample(newVal) {
  this.print(newVal);
}


sample.myCall(a, 123);
