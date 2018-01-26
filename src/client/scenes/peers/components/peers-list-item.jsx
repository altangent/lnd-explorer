import React from 'React';
import { Button } from 'reactstrap';
import { Hex } from '../../../components/hex';
import { BtcValue } from '../../../components/btc-amount';

export const PeerListItem = ({ peer }) => (
  <tr>
    <td>{peer.peer_id}</td>
    <td>
      <Hex value={peer.pub_key} />
    </td>
    <td>{peer.address}</td>
    <td>{peer.bytes_sent}</td>
    <td>{peer.bytes_recv}</td>
    <td>{peer.sat_sent}</td>
    <td>{peer.sat_recv}</td>
    <td>{peer.ping_time / 1e3}ms</td>
    <td>
      <Button color="warning" size="sm">
        Disconnect
      </Button>
    </td>
  </tr>
);
