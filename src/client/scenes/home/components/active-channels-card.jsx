import React from 'react';
import PropTypes from 'prop-types';
import { EntypoFlowCascade } from 'react-entypo';
import { InfoCard, InfoCardTitle, InfoCardValue } from './info-card';

export const ActiveChannelsCard = ({ info }) => (
  <InfoCard>
    <InfoCardTitle>
      <EntypoFlowCascade /> Active Channels
    </InfoCardTitle>
    <InfoCardValue>{info.num_active_channels}</InfoCardValue>
  </InfoCard>
);

ActiveChannelsCard.propTypes = {
  info: PropTypes.object.isRequired,
};
