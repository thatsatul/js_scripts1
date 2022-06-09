var mergeTwoLists = function(l1, l2) {
  let i = 0;
  let j = 0;
  const final = [];
  while (i < l1.length && j < l2.length) {
    if (l1[i] > l2[j]) {
        final.push(l2[j]);
        j++;
    } else {
        final.push(l1[i]);
        i++;
    }
  }
  while(i < l1.length) {
    final.push(l1[i]);
    i++;
  }
  while(j < l2.length) {
    final.push(l2[j]);
    j++;
  }
  console.log(final);
};

const l1 = [1,2,3,5,7,9];
const l2 = [1,3,4,5,6];
mergeTwoLists(l1, l2);
