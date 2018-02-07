import React from 'react';
import { Table } from 'reactstrap';
import { PaymentsListItem } from './payments-list-item';

export const PaymentsList = ({ payments }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Payment hash</th>
          <th>Value</th>
          <th>Creation date</th>
          <th>Path</th>
          <th>Fee</th>
        </tr>
      </thead>
      <tbody>
        {payments.map(payment => <PaymentsListItem key={payment.payment_hash} payment={payment} />)}
      </tbody>
    </Table>
  );
};
