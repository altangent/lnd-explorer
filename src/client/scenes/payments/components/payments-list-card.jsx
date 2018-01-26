import React from 'React';
import { Card, CardHeader } from 'reactstrap';
import { PaymentsList } from './payments-list';

export const PaymentsListCard = ({ payments }) => (
  <Card>
    <CardHeader>Payments</CardHeader>
    <PaymentsList payments={payments} />
  </Card>
);
