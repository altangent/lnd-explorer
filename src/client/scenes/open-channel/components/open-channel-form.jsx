import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Input, Label } from 'reactstrap';

export class OpenChannelForm extends React.Component {
  static propTypes = {
    peers: PropTypes.array,
    onChange: PropTypes.func,
    selectedPeer: PropTypes.string,
    localAmount: PropTypes.any,
    pushAmount: PropTypes.any,
  };

  formChanged = (prop, value) => {
    this.props.onChange(prop, value);
  };

  render() {
    let { peers = [], selectedPeer, localAmount, pushAmount } = this.props;
    return (
      <Form>
        <FormGroup>
          <Label for="newChannelPeer">Select peer:</Label>
          <Input
            type="select"
            onChange={e => this.formChanged('selectedPeer', e.target.value)}
            value={selectedPeer}
          >
            <option value="">Select a peer...</option>
            {peers.map(p => (
              <option key={'peer_' + p.pub_key} value={p.pub_key}>
                {`${p.pub_key.substr(0, 16)} - ${p.address}`}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="newChannelLocalAmt">Local amount:</Label>
          <Input
            type="number"
            onChange={e => this.formChanged('localAmount', parseInt(e.target.value) || '')}
            value={localAmount}
          />
        </FormGroup>
        <FormGroup>
          <Label for="newChannelPushAmt">Push amount:</Label>
          <Input
            type="number"
            onChange={e => this.formChanged('pushAmount', parseInt(e.target.value) || '')}
            value={pushAmount}
          />
        </FormGroup>
      </Form>
    );
  }
}
