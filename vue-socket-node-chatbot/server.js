// See socketio-vue for the client side interaction

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:8080']
  }
});

app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});

io.on('connection', (socket) => {
  let token = socket.handshake.auth.token;
  console.log('a user connected', token);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('clientInput', data => {
    console.log('data received at server', data);
    const tmOut = setTimeout(() => {
      clearTimeout(tmOut);
      socket.emit('serverResponse', {message: 'Response ' + data.message, source: 'server'});
    }, 1500);
  });
});

http.listen(3111, () => {
  console.log('listening on *:3111');
});
