import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { TxList } from './tx-list';

export const TxListCard = ({ transactions }) => (
  <Card>
    <CardHeader>
      <span className="card-header-title">Transactions</span>
    </CardHeader>
    <CardBody>
      <TxList transactions={transactions} />
    </CardBody>
  </Card>
);

TxListCard.propTypes = {
  transactions: PropTypes.array.isRequired,
};
