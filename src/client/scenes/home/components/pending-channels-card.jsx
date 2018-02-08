import React from 'react';
import PropTypes from 'prop-types';
import { EntypoFlowParallel } from 'react-entypo';
import { InfoCard, InfoCardTitle, InfoCardValue } from './info-card';

export const PendingChannelsCard = ({ info }) => (
  <InfoCard>
    <InfoCardTitle>
      <EntypoFlowParallel /> Pending Channels
    </InfoCardTitle>
    <InfoCardValue>{info.num_pending_channels}</InfoCardValue>
  </InfoCard>
);

PendingChannelsCard.propTypes = {
  info: PropTypes.object.isRequired,
};
