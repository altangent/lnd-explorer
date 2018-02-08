import React from 'react';
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
