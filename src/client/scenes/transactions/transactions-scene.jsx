import qs from 'qs';
import React from 'react';
import PropTypes from 'prop-types';
import { TxListCard } from './components/tx-list-card';
import { Loading } from '../../components/loading';

export class TransactionsScene extends React.Component {
  static propTypes = {
    newTxs: PropTypes.array,
  };

  state = {
    txs: undefined,
    page: 1,
    pagesize: 100,
    sortBy: 'num_confirmations',
    sortDir: 'asc',
  };

  componentWillMount() {
    this.loadData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newTxs !== this.props.newTxs) this.loadData();
  }

  loadData() {
    let { page, pagesize, sortBy, sortDir } = this.state;
    fetch('/api/transactions?' + qs.stringify({ page, pagesize, sortBy, sortDir }), { 
      credentials: 'same-origin' 
    })
      .then(res => res.json())
      .then(json => json.txs)
      .then(txs => this.setState({ txs }));
  }

  render() {
    let { txs } = this.state;
    if (!txs) return <Loading />;
    return <TxListCard transactions={txs} />;
  }
}
