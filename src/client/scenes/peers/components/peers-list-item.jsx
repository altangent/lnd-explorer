import React from 'react';
import PropTypes from 'prop-types';
import { Hex } from '../../../components/hex';
import { BtcAmount } from '../../../components/btc-amount';
import { DisconnectPeerModal } from '../../disconnect-peer/disconnect-peer-modal';

export const PeerListItem = ({ peer, onPeerDisconnected }) => (
  <tr>
    <td>
      <DisconnectPeerModal peer={peer} onPeerDisconnected={onPeerDisconnected} />
    </td>
    <td>
      <Hex value={peer.pub_key} substrLength={16} />
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
  </tr>
);

PeerListItem.propTypes = {
  peer: PropTypes.object.isRequired,
  onPeerDisconnected: PropTypes.func,
};
