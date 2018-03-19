import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { ModalAlert } from '../../components/modal-alert';
import { parseJson } from '../../services/rest-helpers';

export class DisconnectPeerModal extends React.Component {
  static propTypes = {
    peer: PropTypes.object.isRequired,
    onPeerDisconnected: PropTypes.func,
  };

  state = {
    open: false,
    error: undefined,
  };

  toggle = () => {
    this.setState({ open: !this.state.open, error: undefined });
  };

  ok = () => {
    this.disconnectPeer()
      .then(peer => {
        if (this.props.onPeerDisconnected) this.props.onPeerDisconnected(peer);
      })
      .then(this.toggle)
      .catch(error => this.setState({ error }));
  };

  disconnectPeer() {
    let { pub_key } = this.props.peer;
    return fetch('/api/peers', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pub_key }),
      credentials: 'same-origin',
    }).then(parseJson);
  }

  render() {
    let { peer } = this.props;
    let { error } = this.state;
    return (
      <div>
        <Button color="primary" size="sm" onClick={this.toggle}>
          Disconnect
        </Button>
        <Modal isOpen={this.state.open} toggle={this.toggle}>
          <ModalHeader>Disconnect from peer</ModalHeader>
          <ModalBody>
            <ModalAlert error={error} />
            <div className="row mb-3">
              <div className="col-sm-12">
                <em>Are you sure you want to disconnect from the peer?</em>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3">Address:</div>
              <div className="col-sm-9">{peer.address}</div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" size="sm" onClick={this.ok}>
              Disconnect
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
