// run web workers
const path = require('path');
var express = require('express');
var app = express();

let timer = 1;
const timerMap = {};

app.use('/static', express.static(path.join(__dirname, 'public')));

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

app.get('/oauth-login', function (req, res) {
  res.status(200);
  res.json({test: 1});
});

app.get('/chat-bot', function (req, res) {
  res.status(200);
  res.sendFile('./test-app/sample-chatbot-1.html', {root: __dirname});
});

app.post('/oauth-login', function (req, res) {
  res.status(201);
  res.json({test: 2});
});

app.get('/view-3d', function (req, res) {
  res.status(200);
  res.sendFile('./test-app/image-360.html', {root: __dirname});
});

app.get('/increase-timer', function (req, res) {
  res.status(200);
  res.json({
    timer,
    timerMap
  });
  timer = timer + 1;
  timerMap[timer] = true;
});

app.get('/iframe-cookie', function (req, res) {
  res.set('Content-Security-Policy', 'frame-ancestors *')
  res.set('X-Frame-Options', 'ALLOW-FROM *');
  res.status(200);
  res.sendFile('./test-app/iframe-cookie.html', {root: __dirname});
});

app.get('*', function (req, res) {
  res.status(404).send('Not Found');
});

app.listen(3333, function(){
  console.log('App listening on port: 3333')
});
