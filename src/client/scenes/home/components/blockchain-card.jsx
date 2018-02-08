import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { DefList, DefListItem, DefListLabel, DefListValue } from '../../../components/def-list';
import { Hex } from '../../../components/hex';
import { BoolValue } from '../../../components/bool-value';

export const BlockchainCard = ({ info }) => (
  <Card>
    <CardHeader>
      <div className="card-header-title">Blockchain</div>
    </CardHeader>
    <CardBody>
      <DefList labelWidth={3}>
        <DefListItem>
          <DefListLabel>Chain:</DefListLabel>
          <DefListValue>{info.chains.join(', ')}</DefListValue>
        </DefListItem>
        <DefListItem>
          <DefListLabel>Block height</DefListLabel>
          <DefListValue>{info.block_height}</DefListValue>
        </DefListItem>
        <DefListItem>
          <DefListLabel>Block hash</DefListLabel>
          <DefListValue>
            <Hex value={info.block_hash} showStart={false} substrLength={32} />
          </DefListValue>
        </DefListItem>
        <DefListItem>
          <DefListLabel>Synced to chain</DefListLabel>
          <DefListValue>
            <BoolValue value={info.synced_to_chain} />
          </DefListValue>
        </DefListItem>
      </DefList>
    </CardBody>
  </Card>
);

BlockchainCard.propTypes = {
  info: PropTypes.object.isRequired,
};
