import React from 'React';
import PropTypes from 'prop-types';
import { Hex } from '../../../components/hex';
import { BtcAmount } from '../../../components/btc-amount';
import { DisconnectPeerModal } from '../../disconnect-peer/disconnect-peer-modal';

export const PeerListItem = ({ peer }) => (
  <tr>
    <td>{peer.peer_id}</td>
    <td>
      <Hex value={peer.pub_key} />
    </td>
    <td>{peer.address}</td>
    <td>{peer.bytes_sent}</td>
    <td>{peer.bytes_recv}</td>
    <td>
      <BtcAmount satoshi={peer.sat_sent} />
    </td>
    <td>
      <BtcAmount satoshi={peer.sat_recv} />
    </td>
    <td>{peer.ping_time / 1e3}ms</td>
    <td>
      <DisconnectPeerModal peer={peer} />
    </td>
  </tr>
);

PeerListItem.propTypes = {
  peer: PropTypes.object.isRequired,
};
