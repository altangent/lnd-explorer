import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { PaymentsList } from './payments-list';
import { SendPaymentModal } from '../../send-payment/send-payment-modal';

export const PaymentsListCard = ({ payments }) => (
  <Card>
    <CardHeader>
      <span className="card-header-title">Payments</span>
      <div className="float-sm-right">
        <SendPaymentModal />
      </div>
    </CardHeader>
    <CardBody>
      <PaymentsList payments={payments} />
    </CardBody>
  </Card>
);

PaymentsListCard.propTypes = {
  payments: PropTypes.array.isRequired,
};
