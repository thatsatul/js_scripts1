function createFunctions() {
  var result = new Array();
  for (var i=0; i < 10; i++){
    result[i] = function(){
      return i;
    };
  }
  return result;
}

var res1 = createFunctions();
console.log('********** Without anonymous function for i = 5 ***********', res1[5]());

// Closure take the last value of the variable in upper scope - Wrox JS book page 224

function createFunctionsNew(){
  var result1 = new Array();
  for (var i=0; i < 10; i++){
    result1[i] = function(num){
      return function(){
        return num;
      };
    }(i);
  }
  return result1;
}

var res2 = createFunctionsNew();
console.log('********** With anonymous function for i = 5 ***********', res2[5]());
