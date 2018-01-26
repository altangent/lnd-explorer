import React from 'React';
import { Card, CardHeader } from 'reactstrap';
import { ChannelsList } from './channels-list';

export const ChannelsCard = props => {
  return (
    <Card className="mb-5">
      <CardHeader>{props.title}</CardHeader>
      <ChannelsList {...props} />
    </Card>
  );
};
