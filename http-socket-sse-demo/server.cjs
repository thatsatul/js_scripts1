// See socketio-vue for the client side interaction

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:8080']
  }
});

app.get('/ui', (req, res) => {
  res.sendFile('./index.html', {root: __dirname});
});

app.get('/http-api', (req, res) => {
  res.json({test: 1});
});

app.get('/subscribe', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  let counter = 0; 
  // Send a message on connection
  res.write('event: connected\n');
  res.write(`data: You are now subscribed!\n`);
  res.write(`id: ${counter}\n\n`);
  counter += 1;

  // Send a subsequent message every five seconds
  setInterval(() => {
      res.write('event: current-date\n');
      res.write(`data: ${new Date().toLocaleString()}\n`);
      res.write(`id: ${counter}\n\n`);
      counter += 1;
  }, 5000);
  
  // Close the connection when the client disconnects
  req.on('close', () => {
    console.log('Subscription closed');
    res.end('OK');
  });

});

io.on('connection', (socket) => {
  let token = socket.handshake.auth.token;
  console.log('a user connected', token);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('clientInput', mssg => {
    console.log('data received at server', mssg);
    const tmOut1 = setTimeout(() => {
      clearTimeout(tmOut1);
      socket.emit('serverResponse', {message: 'Response1 ' + mssg, source: 'server'});
    }, 1000);
    const tmOut2 = setTimeout(() => {
      clearTimeout(tmOut2);
      socket.emit('serverResponse', {message: 'Response2 ' + mssg, source: 'server'});
    }, 2500);
  });
});

http.listen(3111, () => {
  console.log('listening on *:3111');
});
