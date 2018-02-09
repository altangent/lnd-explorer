import React from 'react';
import PropTypes from 'prop-types';
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

ChannelsList.propTypes = {
  ListHeaderComponent: PropTypes.any.isRequired,
  ListItemComponent: PropTypes.any.isRequired,
  channels: PropTypes.array.isRequired,
};
