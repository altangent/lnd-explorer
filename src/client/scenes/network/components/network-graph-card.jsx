import React from 'React';
import { Card, CardHeader } from 'reactstrap';
import { NetworkGraph } from './network-graph';

export const NetworkGraphCard = ({ graph }) => (
  <Card>
    <CardHeader>Network</CardHeader>
    <NetworkGraph graph={graph} />
  </Card>
);
