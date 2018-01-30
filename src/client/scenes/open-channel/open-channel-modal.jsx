import React from 'React';
import PropTypes from 'prop-types';

import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';
import { OpenChannelForm } from './components/open-channel-form';

export class OpenChannelModal extends React.Component {
  static propTypes = {
    resolve: PropTypes.func,
    reject: PropTypes.func,
  };

  state = {
    open: false,
    peers: undefined,
    form: undefined,
  };

  toggle = () => {
    if (!this.state.open) this.loadPeers();
    this.setState({ open: !this.state.open });
  };

  ok = () => {
    let { selectedPeer, localAmount, pushAmount } = this.state.form;
    this.openChannel({
      target_peer_id: selectedPeer,
      local_funding_amount: localAmount,
      push_sat: pushAmount,
    }).then(this.toggle);
  };

  loadPeers = () => {
    fetch('/api/peers')
      .then(res => res.json())
      .then(peers => this.setState({ peers: peers.peers }));
  };

  openChannel({ target_peer_id, local_funding_amount, push_sat }) {
    return fetch('/api/channels', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ target_peer_id, local_funding_amount, push_sat }),
    })
      .then(res => res.json())
      .then(data => console.log(data));
  }

  formChanged = form => {
    this.setState({ form });
  };

  render() {
    let { peers, form } = this.state;
    return (
      <div>
        <Button color="warning" size="sm" onClick={this.toggle}>
          Open channel
        </Button>
        <Modal isOpen={this.state.open} toggle={this.toggle}>
          <ModalHeader toggle={this.close}>Open channel</ModalHeader>
          <ModalBody>
            <OpenChannelForm peers={peers} onChange={this.formChanged} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.ok} disabled={!form || !form.valid}>
              Open
            </Button>
            <Button className="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
