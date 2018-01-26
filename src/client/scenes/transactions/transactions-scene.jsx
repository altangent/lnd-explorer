import React from 'react';
import { TxListCard } from './components/tx-list-card';

export class TransactionsScene extends React.Component {
  constructor() {
    super();
    this.state = {
      transactions: undefined,
    };
  }

  loadTransaction() {
    fetch('/api/transactions')
      .then(res => res.json())
      .then(data => this.setState(data));
  }

  componentWillMount() {
    this.loadTransaction();
  }

  render() {
    let { transactions } = this.state;
    if (!transactions) return <div>Loading...</div>;
    return <TxListCard transactions={transactions.transactions} />;
  }
}
