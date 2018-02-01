import React from 'React';
import PropTypes from 'prop-types';
import { withSocket } from '../../services/socket';
import { Loading } from '../../components/loading';
import { PaymentsListCard } from './components/payments-list-card';

export class PaymentsSceneComponent extends React.Component {
  static propTypes = {
    socket: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.state = {
      payments: undefined,
    };
  }

  componentDidMount() {
    this.props.socket.on('sendpayment', this.fetchPayments);
  }

  componentWillUnmount() {
    this.props.socket.off('sendpayment', this.fetchPayments);
  }

  fetchPayments = () => {
    fetch('/api/payments')
      .then(res => res.json())
      .then(data => this.setState(data));
  };

  componentWillMount() {
    this.fetchPayments();
  }

  render() {
    let { payments } = this.state;
    if (!payments) return <Loading />;
    return <PaymentsListCard payments={payments.payments} />;
  }
}

export const PaymentsScene = withSocket(PaymentsSceneComponent);
