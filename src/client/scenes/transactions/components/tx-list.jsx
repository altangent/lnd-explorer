import React from 'react';
import { Table } from 'reactstrap';
import { TxListItem } from './tx-list-item';

export const TxList = ({ transactions }) => (
  <Table>
    <thead>
      <tr>
        <th>Tx hash</th>
        <th>Amount</th>
        <th>Num confirmations</th>
        <th>Block hash</th>
        <th>Block height</th>
        <th>Timestamp</th>
        <th>Total fees</th>
        <th>Dest addreses</th>
      </tr>
    </thead>
    <tbody>{transactions.map(tx => <TxListItem key={tx.tx_hash} tx={tx} />)}</tbody>
  </Table>
);
