let q = null;
let temp = null;

function add(val) {
  const node = {
    val,
    ptr: q,
  };
  q = node;
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

function search(val) {
  let temp = q;
  let pos = 0;
  while(temp != null) {
    if(temp.val === val) {
      console.log(val + ' found at position ' + (pos + 1) + ' from last node ');
      break;
    }
    else {
      pos++;
      temp = temp.ptr;
    }
  }
}

search(8);
search(2);

function del(val) {
  let temp = q;
  let prev = null;
  if(temp != null && temp.val === val) {
    q = temp.ptr;
    delete(temp);
  }
  while (temp != null && temp.val != val) {
    prev = temp;
    temp = temp.ptr;
  }

  if(temp === null) {
    console.log(val + ' is not present to delete');
    return;
  }

  prev.ptr = temp.ptr;
  delete(temp); 
}

del(6);
show();
del(45);
