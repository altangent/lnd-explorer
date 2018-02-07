import React from 'react';
import { Button } from 'reactstrap';
import { BoolValue } from '../../../components/bool-value';
import { BtcAmount } from '../../../components/btc-amount';
import { Hex } from '../../../components/hex';

export const PendingOpenChannelsListItem = ({ channel }) => (
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
      <BtcAmount satoshi={channel.commit_fee} />
    </td>
    <td>
      <BtcAmount satoshi={channel.commit_weight} />
    </td>
    <td>
      <BtcAmount satoshi={channel.fee_per_kw} />
    </td>
    <td>{channel.confirmation_height}</td>
  </tr>
);
