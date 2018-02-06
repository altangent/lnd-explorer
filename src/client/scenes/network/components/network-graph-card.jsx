import React from 'React';
import { Card, CardHeader } from 'reactstrap';
import { NetworkGraph } from './network-graph';

export const NetworkGraphCard = ({ onNodeSelected }) => (
  <Card>
    <CardHeader>Network</CardHeader>
    <NetworkGraph onNodeSelected={onNodeSelected} />
  </Card>
);
