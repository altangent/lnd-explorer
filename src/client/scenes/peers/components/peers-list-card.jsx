import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader } from 'reactstrap';
import { PeersList } from './peers-list';
import { ConnectPeerModal } from '../../connect-peer/connect-peer-modal';

export const PeersListCard = ({ peers, onPeerConnected, onPeerDisconnected }) => (
  <Card>
    <CardHeader>
      Peers
      <div className="float-sm-right">
        <ConnectPeerModal onPeerConnected={onPeerConnected} />
      </div>
    </CardHeader>
    <PeersList peers={peers} onPeerDisconnected={onPeerDisconnected} />
  </Card>
);

PeersListCard.propTypes = {
  peers: PropTypes.array.isRequired,
  onPeerConnected: PropTypes.func,
  onPeerDisconnected: PropTypes.func,
};
