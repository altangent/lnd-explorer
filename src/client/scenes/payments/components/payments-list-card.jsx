import React from 'React';
import PropTypes from 'prop-types';
import { Card, CardHeader } from 'reactstrap';
import { PaymentsList } from './payments-list';
import { SendPaymentModal } from '../../send-payment/send-payment-modal';

export const PaymentsListCard = ({ payments }) => (
  <Card>
    <CardHeader>
      Payments
      <div className="float-sm-right">
        <SendPaymentModal />
      </div>
    </CardHeader>
    <PaymentsList payments={payments} />
  </Card>
);

PaymentsListCard.propTypes = {
  payments: PropTypes.array.isRequired,
};
