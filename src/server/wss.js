const http = require('http');
const socketio = require('socket.io');
let io;

module.exports = {
  connect,
  broadcastTransaction,
  broadcastInvoice,
  subscribeOpenChannel,
  subscribeCloseChannel,
  subscribeSendPayment,
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

function broadcastInvoice(inv) {
  io.emit('invoice', inv);
}

function subscribeOpenChannel(call) {
  call.on('data', msg => io.emit('openchannel', msg));
  call.on('error', err => io.emit('openchannelerror', err));
}

function subscribeCloseChannel(call) {
  call.on('data', msg => io.emit('closechannel', msg));
  call.on('error', err => io.emit('closechannelerror', err));
}

function subscribeSendPayment(call) {
  call.on('data', msg => io.emit('sendpayment', msg));
  call.on('error', err => io.emit('sendpaymenterror', err));
}
