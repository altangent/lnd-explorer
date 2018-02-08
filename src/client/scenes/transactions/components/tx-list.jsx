import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { TxListItem } from './tx-list-item';

export const TxList = ({ transactions }) => (
  <Table responsive>
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

TxList.propTypes = {
  transactions: PropTypes.array.isRequired,
};
