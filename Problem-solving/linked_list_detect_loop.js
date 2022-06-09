let q = null;
let count = 0;
let first = null;
let insertLoopAtPos = 5;

function add(val) {
  // Storing info of first node
  if(count == 1) {
    first = q;
  }
  // Adding loop in the third node
  if( count === insertLoopAtPos) {
    first.ptr = q;
  }
  const node = {
    val,
    ptr: q,
  };
  q = node;
  count++;
}

function show(num) {
  console.log('SHOWING LOOPED LINKED LIST UPTO 12 elements');
  let temp = q;
  let countLocal = 0;
  while (temp != null && countLocal < count) {
    console.log(temp.val + ' ----- > Not in loop');
    temp = temp.ptr;
    countLocal++;
  }
  while (temp != null && countLocal >= count && countLocal < num) {
    console.log(temp.val + ' ----- > In loop');
    temp = temp.ptr;
    countLocal++;
  }
}

add(3);
add(8);
add(4);
add(12);
add(6);
add(5);
add(1);
add(2);

show(12);

function detectLoop() {
  let temp = q;
  let ptrs = [];
  while(temp != null) {
    if(ptrs.indexOf(temp.ptr) > -1) { 
      console.log('Loop starts at element : ' + temp.ptr.val);
      return;
    }
    ptrs.push(temp.ptr);
    temp = temp.ptr;
  }
  console.log('Loop does not exist');
}

detectLoop();
