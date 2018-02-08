import React from 'react';
import PropTypes from 'prop-types';
import { EntypoGlobe } from 'react-entypo';
import { InfoCard, InfoCardTitle, InfoCardValue } from './info-card';

export const PeersCard = ({ info }) => (
  <InfoCard>
    <InfoCardTitle>
      <EntypoGlobe /> Peers
    </InfoCardTitle>
    <InfoCardValue>{info.num_peers}</InfoCardValue>
  </InfoCard>
);

PeersCard.propTypes = {
  info: PropTypes.object.isRequired,
};
