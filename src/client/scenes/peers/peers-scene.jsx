import React from 'react';
import { PeersListCard } from './components/peers-list-card';
import { Loading } from '../../components/loading';

export class PeersScene extends React.Component {
  constructor() {
    super();
    this.state = {
      peers: undefined,
    };
  }

  fetchPeers = () => {
    fetch('/api/peers', { credentials: 'same-origin' })
      .then(res => res.json())
      .then(data => this.setState(data));
  };

  componentWillMount() {
    this.fetchPeers();
  }

  render() {
    let { peers } = this.state;
    if (!peers) return <Loading />;
    return (
      <PeersListCard
        peers={peers}
        onPeerConnected={this.fetchPeers}
        onPeerDisconnected={this.fetchPeers}
      />
    );
  }
}
