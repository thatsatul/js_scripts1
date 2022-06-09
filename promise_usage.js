const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

console.log('******* Program starts to understand promise ********');
const url = 'https://stackoverflow.com/questions/18119541/passing-this-object-as-argument-in-onchange-event';

const xhr1 = new XMLHttpRequest();
console.log('********* Initiating api call using xhr1 ********');
xhr1.open("GET", url);
xhr1.onload = () => {
  console.log('******** Call of xhr1 finished successfully. But this may display at any time *******');
}
xhr1.onerror = () => {
  console.log('******** Call of xhr1 had some error. But this may display at any time *******');
}
xhr1.send();

console.log('******** This should appear after xhr1 api is finished. But it wont as xhr1 call is Async *********');

var pmInstance = new Promise((resolve, reject) => {
  console.log('********* Calling url using xhr2 ********');
  const xhr2 = new XMLHttpRequest();
  xhr2.open("GET", url);
  xhr2.onload = () => {
    console.log('******** Call of xhr2 finished successfully *******');
    resolve();
  }
  xhr2.onerror = () => {
    console.log('******** Call of xhr2 had some error *******');
    reject();
  }
  xhr2.send();
});

pmInstance
  .then(
    () => {
      console.log('***** Promise done with success *****');
    },
    () => {
      console.log('***** Promise done with error *****');
    }
  )
  .catch(() => {
    console.log('***** Promise failed with error *****');
  });
