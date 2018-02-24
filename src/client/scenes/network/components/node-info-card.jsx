import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { DefList, DefListItem, DefListLabel, DefListValue } from '../../../components/def-list';
import { Timestamp } from '../../../components/timestamp';
import { Hex } from '../../../components/hex';
import { BtcAmount } from '../../../components/btc-amount';
import { ConnectPeerModal } from '../../connect-peer/connect-peer-modal';
import { OpenChannelModal } from '../../open-channel/open-channel-modal';

export const NodeInfoCard = ({ node }) => (
  <Card>
    <CardHeader>
      <div className="float-right">
        <ConnectPeerModal
          openPubkey={node && node.node.pub_key}
          openHost={node && node.node.addresses[0] && node.node.addresses[0].addr}
        />
      </div>
      <div className="float-right mr-1">
        <OpenChannelModal openPubKey={node && node.node.pub_key} />
      </div>
      <div className="card-header-title">Node</div>
    </CardHeader>
    <CardBody>{renderNode(node)}</CardBody>
  </Card>
);

function renderNode(node) {
  if (!node) return '';
  return (
    <DefList labelWidth={3}>
      <DefListItem>
        <DefListLabel>Pub key:</DefListLabel>
        <DefListValue>
          <Hex value={node.node.pub_key} />
        </DefListValue>
      </DefListItem>
      <DefListItem>
        <DefListLabel>Alias</DefListLabel>
        <DefListValue>
          {node.node.alias ? node.node.alias : <em>Alias not configured</em>}
        </DefListValue>
      </DefListItem>
      <DefListItem>
        <DefListLabel>Addresses:</DefListLabel>
        <DefListValue>{node.node.addresses.map(a => a.addr).join(', ')}</DefListValue>
      </DefListItem>
      <DefListItem>
        <DefListLabel>Last updated:</DefListLabel>
        <DefListValue>
          <Timestamp timestamp={node.node.last_update} />
        </DefListValue>
      </DefListItem>
      <DefListItem>
        <DefListLabel>Channels:</DefListLabel>
        <DefListValue>{node.num_channels}</DefListValue>
      </DefListItem>
      <DefListItem>
        <DefListLabel>Total capacity:</DefListLabel>
        <DefListValue>
          <BtcAmount satoshi={node.total_capacity} />
        </DefListValue>
      </DefListItem>
    </DefList>
  );
}

NodeInfoCard.propTypes = {
  node: PropTypes.object,
};
