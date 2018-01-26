import React from 'react';
import { Card, CardHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import { DefList, DefListItem, DefListLabel, DefListValue } from '../../../components/def-list';
import { BtcAmount } from '../../../components/btc-amount';

export const WalletBalanceCard = ({ walletBalance, title }) => (
  <Card>
    <CardHeader>{title}</CardHeader>
    <DefList>
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
  </Card>
);
