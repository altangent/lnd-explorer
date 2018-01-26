import React from 'React';
import { Hex } from '../../../components/hex';
import { BtcAmount } from '../../../components/btc-amount';
import { BoolValue } from '../../..//components/bool-value';
import { Timestamp } from '../../../components/timestamp';

export const InvoicesListItem = ({ invoice }) => (
  <tr>
    <td>{invoice.memo}</td>
    <td>
      <Hex value={invoice.receipt} />
    </td>
    <td>
      <Hex value={invoice.r_preimage} />
    </td>
    <td>
      <Hex value={invoice.r_hash} />
    </td>
    <td>
      <BtcAmount satoshi={invoice.value} />
    </td>
    <td>
      <BoolValue value={invoice.settled} />
    </td>
    <td>
      <Timestamp timestamp={invoice.creation_date} />
    </td>
    <td>
      <Timestamp timestamp={invoice.settle_date} />
    </td>
    <td>
      <Hex value={invoice.payment_request} />
    </td>
  </tr>
);
