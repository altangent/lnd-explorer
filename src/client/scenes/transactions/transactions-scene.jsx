import qs from 'qs';
import React from 'react';
import PropTypes from 'prop-types';
import { TxListCard } from './components/tx-list-card';

export class TransactionsScene extends React.Component {
  static propTypes = {
    markAsRead: PropTypes.func,
    newTxs: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      txs: undefined,
      page: 1,
      pagesize: 25,
      sortBy: 'num_confirmations',
      sortDir: 'asc',
    };
  }

  componentWillMount() {
    this.loadData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newTxs !== this.props.newTxs) this.loadData();
  }

  loadData() {
    let { page, pagesize, sortBy, sortDir } = this.state;
    fetch('/api/transactions?' + qs.stringify({ page, pagesize, sortBy, sortDir }))
      .then(res => res.json())
      .then(json => json.txs)
      .then(txs => {
        this.setState({ txs });
        this.props.markAsRead(txs);
      });
  }

  render() {
    let { txs } = this.state;
    if (!txs) return <div>Loading...</div>;
    return <TxListCard transactions={txs} />;
  }
}
