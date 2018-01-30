import React from 'React';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { BtcAmount } from '../../components/btc-amount';
import { Hex } from '../../components/hex';

export class CloseChannelModal extends React.Component {
  static propTypes = {
    channel: PropTypes.object,
  };

  state = {
    open: false,
  };

  toggle = () => this.setState({ open: !this.state.open });

  ok = () => {
    let channel = this.props.channel;
    this.closeChannel(channel).then(this.toggle);
  };

  closeChannel = channel => {
    return fetch('/api/channels', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(channel),
    })
      .then(res => res.json())
      .then(data => console.log(data));
  };

  render() {
    let { channel } = this.props;
    let { open } = this.state;
    if (!channel) return <div />;
    return (
      <div>
        <Button color="warning" size="sm" onClick={this.toggle}>
          Close
        </Button>
        <Modal isOpen={open} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Close channel?</ModalHeader>
          <ModalBody>
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
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.ok}>
              Close
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
