import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { DefList, DefListItem, DefListLabel, DefListValue } from '../../../components/def-list';
import { BtcAmount } from '../../../components/btc-amount';
import { Hex } from '../../../components/hex';
import { BoolValue } from '../../../components/bool-value';

export const InfoCard = ({ info, channelBalance }) => (
  <Card>
    <CardHeader>
      <span className="card-header-title">Info</span>
    </CardHeader>
    <CardBody>
      <DefList>
        <DefListItem>
          <DefListLabel>Channel balance</DefListLabel>
          <DefListValue>
            <BtcAmount satoshi={channelBalance.balance} />
          </DefListValue>
        </DefListItem>
        <DefListItem>
          <DefListLabel>Public key</DefListLabel>
          <DefListValue>
            <Hex value={info.identity_pubkey} />
          </DefListValue>
        </DefListItem>
        <DefListItem>
          <DefListLabel>Num pending channels</DefListLabel>
          <DefListValue>
            <Link to="/channels">{info.num_pending_channels}</Link>
          </DefListValue>
        </DefListItem>
        <DefListItem>
          <DefListLabel>Num active channels</DefListLabel>
          <DefListValue>
            <Link to="/channels">{info.num_active_channels}</Link>
          </DefListValue>
        </DefListItem>
        <DefListItem>
          <DefListLabel>Num peers</DefListLabel>
          <DefListValue>
            <Link to="/peers">{info.num_peers}</Link>
          </DefListValue>
        </DefListItem>
        <DefListItem>
          <DefListLabel>Block height</DefListLabel>
          <DefListValue>{info.block_height}</DefListValue>
        </DefListItem>
        <DefListItem>
          <DefListLabel>Block hash</DefListLabel>
          <DefListValue>
            <Hex value={info.block_hash} showStart={false} />
          </DefListValue>
        </DefListItem>
        <DefListItem>
          <DefListLabel>Synced to chain</DefListLabel>
          <DefListValue>
            <BoolValue value={info.synced_to_chain} />
          </DefListValue>
        </DefListItem>
        <DefListItem>
          <DefListLabel>Testnet</DefListLabel>
          <DefListValue>
            <BoolValue value={info.testnet} />
          </DefListValue>
        </DefListItem>
        <DefListItem>
          <DefListLabel>Chains</DefListLabel>
          <DefListValue>{info.chains.join(', ')}</DefListValue>
        </DefListItem>
        <DefListItem>
          <DefListLabel>URIs</DefListLabel>
          <DefListValue>{info.uris.join(', ')}</DefListValue>
        </DefListItem>
      </DefList>
    </CardBody>
  </Card>
);

InfoCard.propTypes = {
  info: PropTypes.object.isRequired,
  channelBalance: PropTypes.object.isRequired,
};
