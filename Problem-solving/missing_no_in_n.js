const n = 8;
const arr = [3,2,1,8,7,5,6];
// Find missing no. - assume n can be very large

function missing() {
  let expected = 0;
  let actual = 0;
  for(i = 1; i<= n; i++) {
    expected = expected ^ (i);
    if(arr[i-1]) {
      actual = actual ^ arr[i-1];
    }
  }

  const missing = expected ^ actual;
  console.log(missing);
}

missing();
