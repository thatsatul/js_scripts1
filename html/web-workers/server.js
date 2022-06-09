// run web workers
const path = require('path');
var express = require('express');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function (req, res) {
  res.status(200);
  res.sendFile('./index.html', {root: __dirname});
});

app.listen(3333, function(){
  console.log('App listening on port: 3333')
});
