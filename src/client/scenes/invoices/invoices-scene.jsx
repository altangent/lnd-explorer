import React from 'react';
import { Loading } from '../../components/loading';
import { InvoicesCard } from './components/invoices-card';

export class InvoicesScene extends React.Component {
  constructor() {
    super();
    this.state = {
      invoices: undefined,
    };
  }

  fetchInvoices = () => {
    fetch('/api/invoices')
      .then(res => res.json())
      .then(data => this.setState(data));
  };

  componentWillMount() {
    this.fetchInvoices();
  }

  render() {
    let { invoices } = this.state;
    if (!invoices) return <Loading />;
    return <InvoicesCard invoices={invoices.invoices} onInvoiceCreated={this.fetchInvoices} />;
  }
}
