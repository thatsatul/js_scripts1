import fetch from 'node-fetch';

async function getData() {
  const res = await fetch('http://hn.algolia.com/api/v1/items/1');
  const data = await res.json();
  if(data) {
    // return data;
    return Promise.resolve(data);
  }
  // throw('Network error');
  return Promise.reject('Network error 1');
}

getData().then(res => console.log('Data1 is : ', res)).catch((e) => console.log('Error1 is : ', e.message));
