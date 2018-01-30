import React from 'React';
import { Table } from 'reactstrap';
import { PeerListItem } from './peers-list-item';

export const PeersList = ({ peers }) => (
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
    <tbody>{peers.map(peer => <PeerListItem key={'peer_' + peer.peer_id} peer={peer} />)}</tbody>
  </Table>
);
