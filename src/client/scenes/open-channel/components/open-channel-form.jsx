import React from 'React';
import PropTypes from 'prop-types';
import { Form, FormGroup, Input, Label } from 'reactstrap';

export class OpenChannelForm extends React.Component {
  static propTypes = {
    peers: PropTypes.array,
    onChange: PropTypes.func,
  };

  state = {
    valid: false,
    selectedPeer: undefined,
    localAmount: 0,
    pushAmount: 0,
  };

  componentDidUpdate(nextProps, nextState) {
    if (nextState !== this.state) this.props.onChange(this.state);
  }

  peerChanged = selectedPeer => {
    let valid = this.validate({ ...this.state, selectedPeer });
    this.setState({ selectedPeer, valid });
  };

  formChanged = (prop, value) => {
    let valid = this.validate({ ...this.state, [prop]: value });
    this.setState({ [prop]: value, valid });
  };

  validate = ({ selectedPeer, localAmount, pushAmount }) => {
    return selectedPeer > 0 && localAmount > 0 && pushAmount >= 0;
  };

  render() {
    let { peers = [] } = this.props;
    let { selectedPeer, localAmount, pushAmount } = this.state;
    return (
      <Form>
        <FormGroup>
          <Label for="newChannelPeer">Select peer:</Label>
          <Input
            type="select"
            onChange={e => this.peerChanged(parseInt(e.target.value))}
            value={selectedPeer && selectedPeer.peer_id}
          >
            <option value="">Select a peer...</option>
            {peers.map(p => (
              <option key={'peer_' + p.peer_id} value={p.peer_id}>
                {p.address}
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
