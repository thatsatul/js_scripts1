// run web workers
const path = require('path');
var express = require('express');
const fs = require('fs');
const readline = require('readline');
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

app.get('/chrome-intent', function (req, res) {
  res.status(200);
  res.sendFile('./test-app/chrome-intent.html', {root: __dirname});
});

app.get('/iframe-cookie', function (req, res) {
  res.set('Content-Security-Policy', 'frame-ancestors *')
  res.set('X-Frame-Options', 'ALLOW-FROM *');
  res.status(200);
  res.sendFile('./test-app/iframe-cookie.html', {root: __dirname});
});

app.get('/read-file', function() {

  function removeDuplicates(inputFilePath, outputFilePath) {
    const uniqueLines = new Set();

    const rl = readline.createInterface({
      input: fs.createReadStream(inputFilePath),
      output: process.stdout,
      terminal: false
    });

    rl.on('line', (line) => {
      uniqueLines.add(line);
    });

    rl.on('close', () => {
      const uniqueLinesArray = Array.from(uniqueLines);
      const outputContent = uniqueLinesArray.join('\n');

      fs.writeFileSync(outputFilePath, outputContent);

      console.log(`Duplicates removed. Result written to ${outputFilePath}`);
    });
  }

  // const inputFilePath = '~/Downloads/reasoncodes.txt';  // Replace with the path to your input file
  // const outputFilePath = '~/Downloads/output.txt';  // Replace with the desired output file path

  const inputFilePath = '../../Downloads/reasoncodes.txt';  // Replace with the path to your input file
  const outputFilePath = '../../Downloads/output.txt';  // Replace with the desired output file path

  removeDuplicates(inputFilePath, outputFilePath);
});

app.get('*', function (req, res) {
  res.status(404).send('Not Found');
});

app.listen(3333, function(){
  console.log('App listening on port: 3333')
});
