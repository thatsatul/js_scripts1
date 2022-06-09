// How many total passengers are in BLR and KOL together on bus at any time if we have been given number of passengers against the timestamp.

// Bangalore
// (1:00, 10), (1:05, 12), (1:15, 20), (2:00, 9)

// Kolkata
// (1:03, 11), (1:05 11), (1:30, 3), (2:30, 4)

/*
total
(1:00, 10), (1:03, 21), (1:05, 23), (1:15, 31), (1:30, 23), (2:00, 12), (2:30, 13)
*/

const blr = [{
  time: '1:00',
  num: 10
},
{
  time: '1:05',
  num: 12
},
{
  time: '1:15',
  num: 20
},
{
  time: '2:00',
  num: 9
}];

const kol = [{
  time: '1:03',
  num: 11
},
{
  time: '1:05',
  num: 11
},
{
  time: '1:30',
  num: 3
},
{
  time: '2:30',
  num: 4
}];

let blrPointer = 0;
let kolPointer = 0;
const final = [];
while(blrPointer < blr.length || kolPointer < kol.length ) {
  console.log(blr[blrPointer], kol[kolPointer]);
  if(blr[blrPointer] && kol[kolPointer] && blr[blrPointer].time === kol[kolPointer].time) {
    final.push({
      time: blr[blrPointer].time,
      num: blr[blrPointer].num + kol[kolPointer].num
    });
    blrPointer++;
    kolPointer++;
  }
  else if(blr[blrPointer] && kol[kolPointer] && blr[blrPointer].time > kol[kolPointer].time) {
    let blrv = blr[blrPointer - 1] ? blr[blrPointer - 1].num : 0;
    final.push({
      time: kol[kolPointer].time,
      num: kol[kolPointer].num + blrv
    });
    kolPointer++;
  } else if (blr[blrPointer]) {
    let kolv = kol[kolPointer - 1] ? kol[kolPointer - 1].num : 0;
    final.push({
      time: blr[blrPointer].time,
      num: kolv + blr[blrPointer].num
    });
    blrPointer++;
  } else if (kol[kolPointer]) {
    let blrv = blr[blrPointer - 1] ? blr[blrPointer - 1].num : 0;
    final.push({
      time: kol[kolPointer].time,
      num: kol[kolPointer].num + blrv
    });
    kolPointer++;
  }
}

console.log(final);
