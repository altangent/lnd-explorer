import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from '../../components/loading';
import { InvoicesCard } from './components/invoices-card';
import { withSocket } from '../../services/socket';

export class InvoicesSceneComponent extends React.Component {
  static propTypes = {
    socket: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.state = {
      invoices: undefined,
    };
  }

  componentDidMount() {
    let { socket } = this.props;
    socket.on('invoice', this.fetchInvoices);
  }

  componentWillUnmount() {
    let { socket } = this.props;
    socket.off('invoice', this.fetchInvoices);
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

export const InvoicesScene = withSocket(InvoicesSceneComponent);
