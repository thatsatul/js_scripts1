import fetch from 'node-fetch';
async function getData() {
  let count = 0;
  while(count === 0 || count < 10) {
    count++;
    const res = await fetch('http://hn.algolia.com/api/v1/items/1');
    const data = await res.json();
    console.log(`***** Count ${count} ******* ${data.id}`);
  }
}

getData();
