import React from 'react';
import { WalletBalanceCard } from './components/wallet-balance-card';
import { Loading } from '../../components/loading';
import { ChannelBalanceCard } from './components/channel-balance-card';
import { PendingChannelsCard } from './components/pending-channels-card';
import { ActiveChannelsCard } from './components/active-channels-card';
import { PeersCard } from './components/peers-card';
import { BlockchainCard } from './components/blockchain-card';
import { Hex } from '../../components/hex';

export class HomeScene extends React.Component {
  constructor() {
    super();
    this.state = {
      info: undefined,
      channelBalance: undefined,
      walletBalance: undefined,
    };
  }

  loadData() {
    fetch('/api/home', { credentials: 'same-origin' })
      .then(res => res.json())
      .then(data => this.setState(data))
      .catch(err => this.setState({ loadError: err }));
  }

  componentWillMount() {
    this.loadData();
  }

  render() {
    let { info, channelBalance, walletBalance } = this.state;
    if (!info) return <Loading />;
    return (
      <div>
        <div className="row">
          <div className="col-sm-3">
            <ChannelBalanceCard channelBalance={channelBalance} />
          </div>
          <div className="col-sm-3">
            <PeersCard info={info} />
          </div>
          <div className="col-sm-3">
            <ActiveChannelsCard info={info} />
          </div>
          <div className="col-sm-3">
            <PendingChannelsCard info={info} />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-6">
            <WalletBalanceCard walletBalance={walletBalance} title="On-chain wallet balance" />
          </div>
          <div className="col-sm-6">
            <BlockchainCard info={info} />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-12">
            <div className="mb-2">
              <strong>Alias: </strong>
              <div>{info.alias ? info.alias : <em>Alias not configured</em>}</div>
            </div>
            <div className="mb-2">
              <strong>Pub Key: </strong>
              <Hex value={info.identity_pubkey} full={true} />
            </div>
            <div className="mb-2">
              <strong>Address: </strong>
              {info.uris.length > 0 ? (
                <Hex value={info.uris[0]} full={true} />
              ) : (
                <div>
                  <em>External address not configured</em>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
