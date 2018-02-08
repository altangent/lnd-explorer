import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { DefList, DefListItem, DefListLabel, DefListValue } from '../../../components/def-list';
import { BtcAmount } from '../../../components/btc-amount';

export const WalletBalanceCard = ({ walletBalance, title }) => (
  <Card>
    <CardHeader>
      <span className="card-header-title">{title}</span>
    </CardHeader>
    <CardBody>
      <DefList labelWidth={3}>
        <DefListItem>
          <DefListLabel>Total balance</DefListLabel>
          <DefListValue>
            <BtcAmount satoshi={walletBalance.total_balance} />
          </DefListValue>
        </DefListItem>
        <DefListItem>
          <DefListLabel>Confirmed balance</DefListLabel>
          <DefListValue>
            <BtcAmount satoshi={walletBalance.confirmed_balance} />
          </DefListValue>
        </DefListItem>
        <DefListItem>
          <DefListLabel>Unconfirmed balance</DefListLabel>
          <DefListValue>
            <BtcAmount satoshi={walletBalance.unconfirmed_balance} />
          </DefListValue>
        </DefListItem>
      </DefList>
    </CardBody>
  </Card>
);

WalletBalanceCard.propTypes = {
  walletBalance: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};
