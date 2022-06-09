function permutation(str){
  permutationHelper(str.split(""), str.length)
}
var pos = 1;
function permutationHelper(str, num){
    if(num == 1) {
      var temp = str[0];
      str[0] = str[pos];
      str[pos] = temp;
      console.log(str.join(""));
      pos++;
      if(pos == str.length)
        pos = 1;
    }
    for(var i = 1; i <= num; i++) {
      permutationHelper(str, num - 1);
    }
}

permutation('abcd');
