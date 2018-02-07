import React from 'react';
import { Table } from 'reactstrap';

export const ChannelsList = ({ ListHeaderComponent, ListItemComponent, channels }) => {
  return (
    <Table responsive>
      <thead>
        <ListHeaderComponent />
      </thead>
      <tbody>
        {channels.map(channel => (
          <ListItemComponent
            key={channel.channel_point || channel.channel.channel_point}
            channel={channel}
          />
        ))}
      </tbody>
    </Table>
  );
};
