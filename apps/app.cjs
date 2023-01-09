// run web workers
const path = require('path');
var express = require('express');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/test', function (req, res) {
  res.status(200);
  res.sendFile('./test-app/test1.html', {root: __dirname});
});

app.get('/test2', function (req, res) {
  res.status(200);
  res.sendFile('./test-app/test2.html', {root: __dirname});
});

app.get('/deeplink', function (req, res) {
  res.status(200);
  res.sendFile('./test-app/index.html', {root: __dirname});
});

app.get('/swipe', function (req, res) {
  res.status(200);
  res.sendFile('./test-app/swipe.html', {root: __dirname});
});

app.get('*', function (req, res) {
  res.status(404).send('Not Found');
});

app.listen(3333, function(){
  console.log('App listening on port: 3333')
});
