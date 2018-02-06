import React from 'React';
import PropTypes from 'prop-types';
import { Card, CardHeader, ListGroup, list } from 'reactstrap';
import { DefList, DefListItem, DefListLabel, DefListValue } from '../../../components/def-list';
import { Timestamp } from '../../../components/timestamp';
import { Hex } from '../../../components/hex';
import { BtcAmount } from '../../../components/btc-amount';

export const NodeInfoCard = ({ node }) => (
  <Card>
    <CardHeader>Node</CardHeader>
    {renderNode(node)}
  </Card>
);

function renderNode(node) {
  if (!node) return '';
  return (
    <DefList labelWidth="3">
      <DefListItem>
        <DefListLabel>Pub key:</DefListLabel>
        <DefListValue>
          <Hex value={node.node.pub_key} />
        </DefListValue>
      </DefListItem>
      <DefListItem>
        <DefListLabel>Addresses:</DefListLabel>
        <DefListValue>{node.node.addresses.join(', ')}</DefListValue>
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
