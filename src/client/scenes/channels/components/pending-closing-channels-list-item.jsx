import React from 'react';
import PropTypes from 'prop-types';
import { BtcAmount } from '../../../components/btc-amount';
import { Hex } from '../../../components/hex';

export const PendingClosingChannelsListItem = ({ channel }) => (
  <tr>
    <td>
      <Hex value={channel.channel.remote_node_pub} />
    </td>
    <td>
      <Hex value={channel.channel.channel_point} />
    </td>
    <td>
      <BtcAmount satoshi={channel.channel.capacity} />
    </td>
    <td>
      <BtcAmount satoshi={channel.channel.local_balance} />
    </td>
    <td>
      <BtcAmount satoshi={channel.channel.remote_balance} />
    </td>
    <td>
      <Hex value={channel.closing_txid} />
    </td>
  </tr>
);

PendingClosingChannelsListItem.propTypes = {
  channel: PropTypes.object.isRequired,
};
