import React from 'React';
import { Card, CardHeader } from 'reactstrap';
import { PeersList } from './peers-list';

export const PeersListCard = ({ peers }) => (
  <Card>
    <CardHeader>Peers</CardHeader>
    <PeersList peers={peers} />
  </Card>
);
