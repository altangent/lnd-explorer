import React from 'react';

export const PendingClosingChannelsListHeader = ({ channels }) => (
  <tr>
    <th>Remote pub key</th>
    <th>Channel point</th>
    <th>Capacity</th>
    <th>Local balance</th>
    <th>Remote balance</th>
    <th>Closing tx id</th>
  </tr>
);
