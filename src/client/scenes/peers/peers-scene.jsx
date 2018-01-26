import React from 'React';
import { PeersListCard } from './components/peers-list-card';

export class PeersScene extends React.Component {
  constructor() {
    super();
    this.state = {
      peers: undefined,
    };
  }

  fetchPeers() {
    fetch('/api/peers')
      .then(res => res.json())
      .then(data => this.setState(data));
  }

  componentWillMount() {
    this.fetchPeers();
  }

  render() {
    let { peers } = this.state;
    if (!peers) return <div>Loading...</div>;
    return <PeersListCard peers={peers} />;
  }
}
