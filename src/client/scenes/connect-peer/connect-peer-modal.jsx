import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { ConnectPeerForm } from './components/connect-peer-form';
import { ModalAlert } from '../../components/modal-alert';
import { parseJson } from '../../services/rest-helpers';

export class ConnectPeerModal extends React.Component {
  static propTypes = {
    connectionComplete: PropTypes.func,
    openPubkey: PropTypes.string,
    openHost: PropTypes.string,
    onPeerConnected: PropTypes.func,
  };

  state = {
    open: false,
    pubkey: '',
    host: '',
    error: undefined,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.openPubkey && nextProps.openPubkey !== this.state.pubkey) {
      this.setState({ pubkey: nextProps.openPubkey, host: nextProps.openHost });
    }
  }

  toggle = () => {
    this.setState({ open: !this.state.open, error: undefined });
  };

  ok = () => {
    this.connectToPeer(this.state)
      .then(peer => {
        if (this.props.onPeerConnected) this.props.onPeerConnected(peer);
      })
      .then(this.toggle)
      .catch(error => this.setState({ error }));
  };

  formUpdated = (key, value) => {
    this.setState({ [key]: value });
  };

  connectToPeer = ({ pubkey, host }) => {
    return fetch('/api/peers', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pubkey, host }),
    }).then(parseJson);
  };

  render() {
    return (
      <div>
        <Button color="primary" size="sm" onClick={this.toggle}>
          Connect to peer
        </Button>
        <Modal isOpen={this.state.open} toggle={this.toggle}>
          <ModalHeader>Connect to peer</ModalHeader>
          <ModalBody>
            <ModalAlert error={this.state.error} />
            <ConnectPeerForm
              onChange={this.formUpdated}
              pubkey={this.state.pubkey}
              host={this.state.host}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" size="sm" onClick={this.ok}>
              Connect
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
