import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { BtcAmount } from '../../components/btc-amount';
import { Hex } from '../../components/hex';
import { ModalAlert } from '../../components/modal-alert';
import { parseJson } from '../../services/rest-helpers';

export class CloseChannelModal extends React.Component {
  static propTypes = {
    channel: PropTypes.object,
  };

  state = {
    open: false,
    error: undefined,
    force: false,
  };

  toggle = () => this.setState({ open: !this.state.open, error: undefined, force: false });

  ok = () => {
    let channel = this.props.channel;
    this.closeChannel(channel)
      .then(this.toggle)
      .catch(error => this.setState({ error }));
  };

  closeChannel = channel => {
    return fetch('/api/channels', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ channel_point: channel.channel_point, force: this.state.force }),
    }).then(parseJson);
  };

  render() {
    let { channel } = this.props;
    let { open, error, force } = this.state;
    if (!channel) return <div />;
    return (
      <div>
        <Button color="primary" size="sm" onClick={this.toggle}>
          Close
        </Button>
        <Modal isOpen={open} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Close channel?</ModalHeader>
          <ModalBody>
            <ModalAlert error={error} />
            <div className="row mb-3">
              <div className="col-sm-12">
                <em>Are you sure you want to close the channel:</em>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3">Channel id:</div>
              <div className="col-sm-9">{channel.chan_id}</div>
            </div>
            <div className="row">
              <div className="col-sm-3">Channel point:</div>
              <div className="col-sm-9">
                <Hex value={channel.channel_point} />
              </div>
            </div>
            <div className="row my-3">
              <div className="col-sm-12">
                <em>This will settle the following balances:</em>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="row">
                  <div className="col-sm-3">Local:</div>
                  <div className="col-sm-9">
                    <BtcAmount satoshi={channel.local_balance} />
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="row">
                  <div className="col-sm-3">Remote:</div>
                  <div className="col-sm-9">
                    <BtcAmount satoshi={channel.remote_balance} />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12" />
            </div>
          </ModalBody>
          <ModalFooter>
            <FormGroup check>
              <Input
                type="checkbox"
                name="force"
                id="forceClose"
                checked={force}
                onChange={e => this.setState({ force: e.target.checked })}
              />
              <Label check for="forceClose">
                Force
              </Label>
            </FormGroup>
            <Button color="primary" size="sm" onClick={this.ok}>
              Close
            </Button>
            <Button color="secondary" size="sm" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
