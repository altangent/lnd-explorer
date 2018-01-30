const http = require('http');
const socketio = require('socket.io');
let io;

module.exports = {
  connect,
  broadcastTransaction,
};

function connect(app) {
  let server = http.Server(app);
  io = socketio(server);
  io.on('connection', socket => console.log(`socket ${socket.id} is connected`));
  return server;
}

function broadcastTransaction(tx) {
  io.emit('transaction', tx);
}
