(function(a, b){
  console.log(a, b); 
}(3, 4));


var func = function(num) {
  num = num * 2;
  console.log(num);
  return num;
}(2);
