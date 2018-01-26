import React from 'React';
import { Card, CardHeader } from 'reactstrap';
import { InvoicesList } from './invoices-list';

export const InvoicesCard = ({ invoices }) => {
  return (
    <Card>
      <CardHeader>Invoices</CardHeader>
      <InvoicesList invoices={invoices} />
    </Card>
  );
};
