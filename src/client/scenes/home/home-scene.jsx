import React from 'react';
import { InfoCard } from './components/info-card';
import { WalletBalanceCard } from './components/wallet-balance-card';

export class HomeScene extends React.Component {
  constructor() {
    super();
    this.state = {
      info: undefined,
      channelBalance: undefined,
      walletBalanceAll: undefined,
      walletBalacnceWitness: undefined,
    };
  }

  loadData() {
    fetch('/api/home')
      .then(res => res.json())
      .then(data => this.setState(data))
      .catch(err => this.setState({ loadError: err }));
  }

  componentWillMount() {
    this.loadData();
  }

  render() {
    let { info, channelBalance, walletBalanceWitness, walletBalanceAll } = this.state;
    if (!info) return <div>Loading...</div>;
    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <InfoCard info={info} channelBalance={channelBalance} />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-6">
            <WalletBalanceCard walletBalance={walletBalanceAll} title="Wallet Balance (All)" />
          </div>
          <div className="col-sm-6">
            <WalletBalanceCard
              walletBalance={walletBalanceWitness}
              title="Wallet Balance (Witness)"
            />
          </div>
        </div>
      </div>
    );
  }
}
