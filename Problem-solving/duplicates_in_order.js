
function getDuplicates(arr) {
  // implement here
  const hash = {};
  const dup = [];
  for(let i = 0; i < arr.length; i++) {
    if(!hash[arr[i]]) {
      hash[arr[i]] = 1;
    } else {
      hash[arr[i]]++;
      if(hash[arr[i]] === 2) {
        dup.push(arr[i]);
      }
    }
  }
  console.log(dup);
}

var arr = [3,2,2,2,3,6,4,6,5,5,8];
getDuplicates(arr); // [2,3,6,5]
