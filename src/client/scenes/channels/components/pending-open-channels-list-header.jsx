import React from 'React';

export const PendingOpenChannelsListHeader = ({ channels }) => (
  <tr>
    <th>Active</th>
    <th>Remote pub key</th>
    <th>Channel point</th>
    <th>Channel id</th>
    <th>Capacity</th>
    <th>Local balance</th>
    <th>Remote balance</th>
    <th>Commit fee</th>
    <th>Commit weight</th>
    <th>Fee per kiloweight</th>
    <th>Confirmation height</th>
    <th>Blocks till open</th>
  </tr>
);
