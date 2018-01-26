import React from 'React';

export const PendingForceChannelsListHeader = ({ channels }) => (
  <tr>
    <th>Remote pub key</th>
    <th>Channel point</th>
    <th>Capacity</th>
    <th>Local balance</th>
    <th>Remote balance</th>
    <th>Closing tx id</th>
    <th>Limbo balance</th>
    <th>Maturity height</th>
    <th>Blocks till maturity</th>
  </tr>
);
