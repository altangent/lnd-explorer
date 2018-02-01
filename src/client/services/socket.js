import React from 'react';
import { EventEmitter } from 'events';
import io from 'socket.io-client';

export class SocketClient extends EventEmitter {
  socket = undefined;

  connect() {
    return new Promise((resolve, reject) => {
      this.socket = io('http://localhost:8000');
      this.socket.on('connect', () => {
        console.log('connected to server');
        resolve();
      });
      this.socket.on('error', reject);
    });
  }
}

export const socketClient = new SocketClient();

export const withSocket = WrappedComponent => {
  return class SocketHighOrderComponent extends React.Component {
    render() {
      return <WrappedComponent socket={socketClient.socket} {...this.props} />;
    }
  };
};
