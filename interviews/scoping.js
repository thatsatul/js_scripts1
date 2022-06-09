function abc() {
  for(var i = 0; i < 5; i++) {
    setTimeout(function(){
      console.log(i);
    }, i*1000);
  }

  console.log(i);
  console.log('abc');
}

// abc() prints
// 5
// abc
// 5
// 5
// 5
// 5
// 5

// change abc() to abcNew() which should print
// 5
// abc
// 0
// 1
// 2
// 3
// 4


function abcNew() {
  var fn = function(i){
    console.log(i);
  }
  for(var i = 0; i < 5; i++) {
    setTimeout(fn.bind(this, i), i*1000);
  }

  console.log(i);
  console.log('abc');
}

// abc();
abcNew();
