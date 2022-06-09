function outer () {
  var a = 10;
  return function () {
    a++;
    console.log(a);
  }
}

var func1 = outer();
var func2 = outer();
func1();
func1();
func2();
