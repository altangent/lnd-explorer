import React from 'React';
import { Loading } from '../../components/loading';
import { NetworkInfoCard } from './components/network-info-card';
import { NetworkGraphCard } from './components/network-graph-card';
import { NodeInfoCard } from './components/node-info-card';

export class NetworkScene extends React.Component {
  constructor() {
    super();
    this.state = {
      networkInfo: undefined,
      graph: undefined,
    };
  }

  fetchData() {
    Promise.all([
      fetch('/api/graph').then(res => res.json()),
      fetch('/api/network').then(res => res.json()),
    ]).then(([graph, networkInfo]) => this.setState({ graph, networkInfo }));
  }

  componentWillMount() {
    this.fetchData();
  }

  render() {
    let { networkInfo } = this.state;
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
            <NetworkGraphCard graph={graph} />
          </div>
          <div className="col-sm-5">
            <NodeInfoCard />
          </div>
        </div>
      </div>
    );
  }
}
