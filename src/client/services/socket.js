import io from 'socket.io-client';
let _socket;

export function connect() {
  return new Promise(resolve => {
    _socket = io('http://localhost:8000');
    _socket.on('connect', () => {
      console.log('connected to server');
      resolve();
    });
  });
}

export const subscribeToTxs = cb => {
  console.log('subscribing to transactions');
  _socket.on('transaction', cb);
};
