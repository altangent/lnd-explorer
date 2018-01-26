import React from 'React';
import { Loading } from '../../components/loading';
import { PaymentsListCard } from './components/payments-list-card';

export class PaymentsScene extends React.Component {
  constructor() {
    super();
    this.state = {
      payments: undefined,
    };
  }

  fetchPayments() {
    fetch('/api/payments')
      .then(res => res.json())
      .then(data => this.setState(data));
  }

  componentWillMount() {
    this.fetchPayments();
  }

  render() {
    let { payments } = this.state;
    if (!payments) return <Loading />;
    return <PaymentsListCard payments={payments.payments} />;
  }
}
