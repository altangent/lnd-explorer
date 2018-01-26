import React from 'react';
import { Hex } from '../../../components/hex';
import { BtcAmount } from '../../../components/btc-amount';
import { Timestamp } from '../../../components/timestamp';

export const TxListItem = ({ tx }) => (
  <tr>
    <td>
      <Hex value={tx.tx_hash} />
    </td>
    <td>
      <BtcAmount satoshi={tx.amount} />
    </td>
    <td>{tx.num_confirmations}</td>
    <td>
      <Hex value={tx.block_hash} showStart={false} />
    </td>
    <td>{tx.block_height}</td>
    <td>
      <Timestamp timestamp={tx.timestamp} />
    </td>
    <td>
      <BtcAmount satoshi={tx.total_fees} />
    </td>
    <td>{tx.dest_addresses.join(', ')}</td>
  </tr>
);
