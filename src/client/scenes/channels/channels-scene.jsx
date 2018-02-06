import React from 'React';
import PropTypes from 'prop-types';

import { withSocket } from '../../services/socket';
import { Loading } from '../../components/loading';
import { ChannelsCard } from './components/channels-card';

export class ChannelsSceneComponent extends React.Component {
  static propTypes = {
    socket: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.state = {
      channelBalance: undefined,
      openChannels: undefined,
      pendingChannels: undefined,
      closeChannelScope: undefined,
    };
  }

  componentDidMount() {
    let { socket } = this.props;
    socket.on('openchannel', this.delayFetchChannels);
    socket.on('closechannel', this.delayFetchChannels);
  }

  componentWillUnmount() {
    let { socket } = this.props;
    socket.off('openchannel', this.delayFetchChannels);
    socket.off('closechannel', this.delayFetchChannels);
  }

  delayFetchChannels = () => {
    setTimeout(this.fetchChannels, 100);
  };

  fetchChannels = () => {
    fetch('/api/channels')
      .then(res => res.json())
      .then(data => this.setState(data));
  };

  componentWillMount() {
    this.fetchChannels();
  }

  render() {
    let { openChannels, pendingChannels } = this.state;
    if (!openChannels) return <Loading />;
    return <ChannelsCard openChannels={openChannels} pendingChannels={pendingChannels} />;
  }
}

export const ChannelsScene = withSocket(ChannelsSceneComponent);
