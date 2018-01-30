import React from 'React';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { ConnectPeerForm } from './components/connect-peer-form';

export class ConnectPeerModal extends React.Component {
  static propTypes = {
    connectionComplete: PropTypes.func,
  };

  state = {
    open: false,
    form: undefined,
  };

  toggle = () => {
    this.setState({ open: !this.state.open });
  };

  ok = () => {
    this.connectToPeer(this.state.form).then(this.toggle);
  };

  formUpdated = form => {
    this.setState({ form });
  };

  connectToPeer = ({ pubkey, host }) => {
    return fetch('/api/peers', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pubkey, host }),
    });
  };

  render() {
    return (
      <div>
        <Button color="warning" size="sm" onClick={this.toggle}>
          Connect to peer
        </Button>
        <Modal isOpen={this.state.open} toggle={this.toggle}>
          <ModalHeader>Connect to peer</ModalHeader>
          <ModalBody>
            <ConnectPeerForm onChange={this.formUpdated} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.ok}>
              Connect
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
