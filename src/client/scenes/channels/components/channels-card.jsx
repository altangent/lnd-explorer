import React from 'React';
import PropTypes from 'prop-types';
import { Card, CardHeader } from 'reactstrap';
import { ChannelsList } from './channels-list';
import { OpenChannelModal } from '../../open-channel/open-channel-modal';

export const ChannelsCard = props => {
  return (
    <Card className="mb-5">
      <CardHeader>
        {props.title}
        <div className="float-sm-right">
          <OpenChannelModal />
        </div>
      </CardHeader>
      <ChannelsList {...props} />
    </Card>
  );
};

ChannelsCard.propTypes = {
  title: PropTypes.string,
};
