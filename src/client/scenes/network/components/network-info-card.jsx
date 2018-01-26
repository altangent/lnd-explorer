import React from 'React';
import { Card, CardHeader } from 'reactstrap';
import { DefList, DefListItem, DefListLabel, DefListValue } from '../../../components/def-list';
import { BtcAmount } from '../../../components/btc-amount';

export const NetworkInfoCard = ({ networkInfo }) => (
  <Card>
    <CardHeader>Network Info</CardHeader>
    <DefList>
      <DefListItem>
        <DefListLabel>Graph diameter</DefListLabel>
        <DefListValue>{networkInfo.graph_diameter}</DefListValue>
      </DefListItem>
      <DefListItem>
        <DefListLabel>Ave out degree</DefListLabel>
        <DefListValue>{networkInfo.avg_out_degree}</DefListValue>
      </DefListItem>
      <DefListItem>
        <DefListLabel>Max out degree</DefListLabel>
        <DefListValue>{networkInfo.max_out_degree}</DefListValue>
      </DefListItem>
      <DefListItem>
        <DefListLabel>Num nodes</DefListLabel>
        <DefListValue>{networkInfo.num_nodes}</DefListValue>
      </DefListItem>
      <DefListItem>
        <DefListLabel>Num channels</DefListLabel>
        <DefListValue>{networkInfo.num_channels}</DefListValue>
      </DefListItem>
      <DefListItem>
        <DefListLabel>Total network capacity</DefListLabel>
        <DefListValue>
          <BtcAmount satoshi={networkInfo.total_network_capacity} />
        </DefListValue>
      </DefListItem>
      <DefListItem>
        <DefListLabel>Avg channel size</DefListLabel>
        <DefListValue>
          <BtcAmount satoshi={networkInfo.avg_channel_size} />
        </DefListValue>
      </DefListItem>
      <DefListItem>
        <DefListLabel>Max network capacity</DefListLabel>
        <DefListValue>
          <BtcAmount satoshi={networkInfo.max_channel_size} />
        </DefListValue>
      </DefListItem>
    </DefList>
  </Card>
);
