import React from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, Nav, NavItem, NavLink, Badge } from 'reactstrap';
import { ChannelsList } from './channels-list';
import { OpenChannelModal } from '../../open-channel/open-channel-modal';

import { OpenChannelsListHeader } from './open-channels-list-header';
import { OpenChannelsListItem } from './open-channels-list-item';
import { PendingOpenChannelsListItem } from './pending-open-channels-list-item';
import { PendingOpenChannelsListHeader } from './pending-open-channels-list-header';
import { PendingClosingChannelsListItem } from './pending-closing-channels-list-item';
import { PendingClosingChannelsListHeader } from './pending-closing-channels-list-header';
import { PendingForceChannelsListItem } from './pending-force-channels-list-item';
import { PendingForceChannelsListHeader } from './pending-force-channels-list-header';

export const ChannelsCard = withRouter(({ location, openChannels, pendingChannels }) => {
  return (
    <Card>
      <CardHeader>
        <div className="float-sm-right">
          <OpenChannelModal />
        </div>
        Channels
      </CardHeader>
      <CardBody>
        <Nav tabs>
          <NavItem>
            <NavLink tag={Link} to="/channels" active={location.pathname === '/channels'}>
              Open&nbsp;{renderBadge(openChannels.length)}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag={Link}
              to="/channels/pending"
              active={location.pathname === '/channels/pending'}
            >
              Pending open&nbsp;{renderBadge(pendingChannels.pending_open_channels.length)}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag={Link}
              to="/channels/closing"
              active={location.pathname === '/channels/closing'}
            >
              Closing&nbsp;{renderBadge(pendingChannels.pending_closing_channels.length)}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag={Link}
              to="/channels/force"
              active={location.pathname === '/channels/force'}
            >
              Force closing&nbsp;{renderBadge(
                pendingChannels.pending_force_closing_channels.length
              )}
            </NavLink>
          </NavItem>
        </Nav>
        <Route
          path="/channels"
          exact
          render={() => (
            <ChannelsList
              ListHeaderComponent={OpenChannelsListHeader}
              ListItemComponent={OpenChannelsListItem}
              channels={openChannels}
            />
          )}
        />
        <Route
          path="/channels/pending"
          render={() => (
            <ChannelsList
              ListHeaderComponent={PendingOpenChannelsListHeader}
              ListItemComponent={PendingOpenChannelsListItem}
              channels={pendingChannels.pending_open_channels}
            />
          )}
        />
        <Route
          path="/channels/closing"
          render={() => (
            <ChannelsList
              ListHeaderComponent={PendingClosingChannelsListHeader}
              ListItemComponent={PendingClosingChannelsListItem}
              channels={pendingChannels.pending_closing_channels}
            />
          )}
        />
        <Route
          path="/channels/force"
          render={() => (
            <ChannelsList
              ListHeaderComponent={PendingForceChannelsListHeader}
              ListItemComponent={PendingForceChannelsListItem}
              channels={pendingChannels.pending_force_closing_channels}
            />
          )}
        />
      </CardBody>
    </Card>
  );
});

function renderBadge(count) {
  if (!count) return '';
  else return <Badge color="light">{count}</Badge>;
}
