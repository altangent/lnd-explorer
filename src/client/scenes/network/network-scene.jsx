import React from 'react';
import { Loading } from '../../components/loading';
import { NetworkInfoCard } from './components/network-info-card';
import { NetworkGraphCard } from './components/network-graph-card';
import { NodeInfoCard } from './components/node-info-card';

export class NetworkScene extends React.Component {
  constructor() {
    super();
    this.state = {
      networkInfo: undefined,
      node: undefined,
    };
  }

  fetchData() {
    fetch('/api/network')
      .then(res => res.json())
      .then(networkInfo => this.setState({ networkInfo: networkInfo.networkInfo }));
  }

  fetchNode(pubKey) {
    return fetch('/api/network/' + pubKey).then(res => res.json());
  }

  onNodeSelected = pubKey => {
    this.fetchNode(pubKey).then(node => this.setState({ node }));
  };

  componentWillMount() {
    this.fetchData();
  }

  render() {
    let { networkInfo, node } = this.state;
    if (!networkInfo) return <Loading />;
    return (
      <div>
        <div className="row mb-5">
          <div className="col-sm-12">
            <NetworkInfoCard networkInfo={networkInfo} />
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-sm-7">
            <NetworkGraphCard onNodeSelected={this.onNodeSelected} />
          </div>
          <div className="col-sm-5">
            <NodeInfoCard node={node} />
          </div>
        </div>
      </div>
    );
  }
}
