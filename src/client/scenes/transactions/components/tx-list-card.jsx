import React from 'react';
import { Card, CardHeader } from 'reactstrap';
import { TxList } from './tx-list';

export const TxListCard = ({ transactions }) => (
  <Card>
    <CardHeader>Transactions</CardHeader>
    <TxList transactions={transactions} />
  </Card>
);
