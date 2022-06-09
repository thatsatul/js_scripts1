// permutation of ABC

let count = 0;
function permute(suffix, prefix) {
  if (suffix.length <= 1) {
    console.log(prefix + suffix);
    count++;
    return;
  }

  for(let i = 0; i < suffix.length; i++) {
    const ch = suffix.charAt(i);
    const suff = suffix.substr(0, i) + suffix.substr(i+1);
    permute(suff, prefix + ch);
  }
}

const word = 'ABCD';
permute(word, '');
console.log(count);
