import React from 'React';
import { Button } from 'reactstrap';
import { BoolValue } from '../../../components/bool-value';
import { BtcAmount } from '../../../components/btc-amount';
import { Hex } from '../../../components/hex';

export const PendingOpenChannelsListItem = ({ channel }) => (
  <tr>
    <td>
      <BoolValue value={channel.active} />
    </td>
    <td>
      <Hex value={channel.remote_pubkey} />
    </td>
    <td>
      <Hex value={channel.channel_point} />
    </td>
    <td>{channel.chan_id}</td>
    <td>
      <BtcAmount satoshi={channel.capacity} />
    </td>
    <td>
      <BtcAmount satoshi={channel.local_balance} />
    </td>
    <td>
      <BtcAmount satoshi={channel.remote_balance} />
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
    <td>{channel.confirmation.height}</td>
    <td>{channel.blocks_till_open}</td>
  </tr>
);
