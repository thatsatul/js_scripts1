// [ 1 ]
// [ 2, 3 ]
// [ 4, 5, 6 ]
// [ 7, 8, 9, 10 ]
// [ 11, 12, 13, 14, 15 ]
// [ 16, 17, 18 ]

function zigzag(n) {
  let i = 1;
  let count = 1;
  while(i <= n) {
    let counter = 1;
    const arr = [];
    while(counter <= count && i <= n) {
      arr.push(i);
      counter++;
      i++;
    }
    if(count % 2 === 1) {
      console.log(arr);
    } else {
      console.log(arr.reverse());
    }
    count++;
  }
}

zigzag(18);
zigzag(23);
