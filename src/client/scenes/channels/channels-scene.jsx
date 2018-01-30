import React from 'React';
import { Loading } from '../../components/loading';
import { ChannelsCard } from './components/channels-card';

import { OpenChannelsListHeader } from './components/open-channels-list-header';
import { OpenChannelsListItem } from './components/open-channels-list-item';
import { PendingOpenChannelsListItem } from './components/pending-open-channels-list-item';
import { PendingOpenChannelsListHeader } from './components/pending-open-channels-list-header';
import { PendingClosingChannelsListItem } from './components/pending-closing-channels-list-item';
import { PendingClosingChannelsListHeader } from './components/pending-closing-channels-list-header';
import { PendingForceChannelsListItem } from './components/pending-force-channels-list-item';
import { PendingForceChannelsListHeader } from './components/pending-force-channels-list-header';

export class ChannelsScene extends React.Component {
  constructor() {
    super();
    this.state = {
      channelBalance: undefined,
      openChannels: undefined,
      pendingChannels: undefined,
      closeChannelScope: undefined,
    };
  }

  fetchChannels() {
    fetch('/api/channels')
      .then(res => res.json())
      .then(data => this.setState(data));
  }

  componentWillMount() {
    this.fetchChannels();
  }

  render() {
    let { openChannels, pendingChannels } = this.state;
    if (!openChannels) return <Loading />;
    return (
      <div>
        <ChannelsCard
          ListHeaderComponent={OpenChannelsListHeader}
          ListItemComponent={OpenChannelsListItem}
          channels={openChannels}
          title="Open channels"
        />
        <ChannelsCard
          ListHeaderComponent={PendingOpenChannelsListHeader}
          ListItemComponent={PendingOpenChannelsListItem}
          channels={pendingChannels.pending_open_channels}
          title="Pending open channels"
        />
        <ChannelsCard
          ListHeaderComponent={PendingClosingChannelsListHeader}
          ListItemComponent={PendingClosingChannelsListItem}
          channels={pendingChannels.pending_closing_channels}
          title="Pending closing channels"
        />
        <ChannelsCard
          ListHeaderComponent={PendingForceChannelsListHeader}
          ListItemComponent={PendingForceChannelsListItem}
          channels={pendingChannels.pending_force_closing_channels}
          title="Force closing channels"
        />
      </div>
    );
  }
}
