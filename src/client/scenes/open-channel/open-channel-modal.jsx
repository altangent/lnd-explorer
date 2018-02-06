import React from 'React';
import PropTypes from 'prop-types';

import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';
import { OpenChannelForm } from './components/open-channel-form';
import { ModalAlert } from '../../components/modal-alert';
import { parseJson } from '../../services/rest-helpers';

export class OpenChannelModal extends React.Component {
  static propTypes = {
    resolve: PropTypes.func,
    reject: PropTypes.func,
  };

  state = {
    open: false,
    peers: undefined,
    form: undefined,
    error: undefined,
  };

  toggle = () => {
    if (!this.state.open) this.loadPeers();
    this.setState({ open: !this.state.open, error: undefined });
  };

  ok = () => {
    let { selectedPeer, localAmount, pushAmount } = this.state.form;
    this.openChannel({
      target_peer_id: selectedPeer,
      local_funding_amount: localAmount,
      push_sat: pushAmount,
    })
      .then(this.toggle)
      .catch(error => this.setState({ error }));
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
    }).then(parseJson);
  }

  formChanged = form => {
    this.setState({ form });
  };

  render() {
    let { open, peers, form, error } = this.state;
    return (
      <div>
        <Button color="warning" size="sm" onClick={this.toggle}>
          Open channel
        </Button>
        <Modal isOpen={open} toggle={this.toggle}>
          <ModalHeader toggle={this.close}>Open channel</ModalHeader>
          <ModalBody>
            <ModalAlert error={error} />
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
