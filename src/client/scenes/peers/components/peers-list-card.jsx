import React from 'React';
import PropTypes from 'prop-types';
import { Card, CardHeader } from 'reactstrap';
import { PeersList } from './peers-list';
import { ConnectPeerModal } from '../../connect-peer/connect-peer-modal';

export const PeersListCard = ({ peers }) => (
  <Card>
    <CardHeader>
      Peers
      <div className="float-sm-right">
        <ConnectPeerModal />
      </div>
    </CardHeader>
    <PeersList peers={peers} />
  </Card>
);

PeersListCard.propTypes = {
  peers: PropTypes.array.isRequired,
};
