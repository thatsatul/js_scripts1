// Implement bind like functionality

// How will you implement bind without call or apply
Function.prototype.myBind = function(scope) {
  console.log(this);
  var self = this;
  return function(...args) {
    console.log(this);
    self.apply(scope, args);
  }
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

// sample(); // will give error
const bound = sample.bind(a);
bound(123);
