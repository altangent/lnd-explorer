import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { PeersList } from './peers-list';
import { ConnectPeerModal } from '../../connect-peer/connect-peer-modal';

export const PeersListCard = ({ peers, onPeerConnected, onPeerDisconnected }) => (
  <Card>
    <CardHeader>
      <span className="card-header-title">Peers</span>
      <div className="float-right">
        <ConnectPeerModal onPeerConnected={onPeerConnected} />
      </div>
    </CardHeader>
    <CardBody>
      <PeersList peers={peers} onPeerDisconnected={onPeerDisconnected} />
    </CardBody>
  </Card>
);

PeersListCard.propTypes = {
  peers: PropTypes.array.isRequired,
  onPeerConnected: PropTypes.func,
  onPeerDisconnected: PropTypes.func,
};
