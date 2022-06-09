function get(count) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(count <= 5)
        resolve(count + ':abc');
      else
        reject(count + ':err')
    }, 1000);
  });
}

function getData(count) {
  if(count > 10)
    return;
  const pm = get(count);
  pm.then(res => {
    if(res) {
      getData(count + 1);
    }
    console.log('***** count, res *****', count, res);
  },
  err => {
    console.log('***** count, res *****', count, err);
  });
}

getData(1);
