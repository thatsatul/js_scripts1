let q = null;
let count = 0;

function add(val) {
  const node = {
    val,
    ptr: q,
  };
  q = node;
  count++;
}

function show() {
  let temp = q;
  while (temp != null) {
    console.log(temp.val + ' ----- >');
    temp = temp.ptr;
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

show();

function middle() {
  let jump2 = q;
  let jump1 = q;
  if (jump2 === null) {
    console.log('No node in Linked list');
    return;
  }
  if (jump2.ptr === null) {
    console.log('Only one node in Linked list');
    return;
  }
  if (jump2.ptr.ptr === null) {
    console.log('Only two nodes in Linked list');
    return;
  }
  while(jump2.ptr != null && jump2.ptr.ptr != null) {
    jump1 = jump1.ptr;
    jump2 = jump2.ptr.ptr;
  }
  console.log(jump1.val + ' is the middle element');
}

middle();
