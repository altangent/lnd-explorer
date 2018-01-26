import React from 'React';
import { Table } from 'reactstrap';
import { InvoicesListItem } from './invoices-list-item';

export const InvoicesList = ({ invoices }) => (
  <Table>
    <thead>
      <tr>
        <th>Memo</th>
        <th>Receipt</th>
        <th>R preimage</th>
        <th>R hash</th>
        <th>Value</th>
        <th>Settled</th>
        <th>Creation date</th>
        <th>Settle date</th>
        <th>Payment request</th>
      </tr>
    </thead>
    <tbody>
      {invoices.map(invoice => (
        <InvoicesListItem key={invoice.payment_request} invoice={invoice} />
      ))}
    </tbody>
  </Table>
);
