import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { PeerListItem } from './peers-list-item';

export const PeersList = ({ peers, onPeerDisconnected }) => (
  <Table>
    <thead>
      <tr>
        <th>Peer Id</th>
        <th>Pub key</th>
        <th>Address</th>
        <th>Bytes sent</th>
        <th>Bytes Recv</th>
        <th>Sat sent</th>
        <th>Sat recv</th>
        <th>Ping time</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {peers.map(peer => (
        <PeerListItem
          key={'peer_' + peer.peer_id}
          peer={peer}
          onPeerDisconnected={onPeerDisconnected}
        />
      ))}
    </tbody>
  </Table>
);

PeersList.propTypes = {
  peers: PropTypes.array.isRequired,
  onPeerDisconnected: PropTypes.func,
};
