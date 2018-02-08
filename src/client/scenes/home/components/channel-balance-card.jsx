import React from 'react';
import PropTypes from 'prop-types';
import { EntypoFlash } from 'react-entypo';
import { InfoCard, InfoCardTitle, InfoCardValue } from './info-card';

export const ChannelBalanceCard = ({ channelBalance }) => (
  <InfoCard>
    <InfoCardTitle>
      <EntypoFlash /> Channel Balance
    </InfoCardTitle>
    <InfoCardValue size="small">{channelBalance.balance} sat</InfoCardValue>
  </InfoCard>
);

ChannelBalanceCard.propTypes = {
  channelBalance: PropTypes.object.isRequired,
};
