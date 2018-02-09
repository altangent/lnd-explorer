import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader } from 'reactstrap';
import { NetworkGraph } from './network-graph';

export const NetworkGraphCard = ({ onNodeSelected }) => (
  <Card>
    <CardHeader>
      <div className="card-header-title">Network</div>
    </CardHeader>
    <NetworkGraph onNodeSelected={onNodeSelected} />
  </Card>
);

NetworkGraphCard.propTypes = {
  onNodeSelected: PropTypes.func,
};
