import React from 'React';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

export class DisconnectPeerModal extends React.Component {
  static propTypes = {
    peer: PropTypes.object.isRequired,
  };

  state = {
    open: false,
  };

  toggle = () => {
    this.setState({ open: !this.state.open });
  };

  disconnect = () => {
    let { pub_key } = this.props.peer;
    return fetch('/api/peers', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pub_key }),
    }).then(this.toggle);
  };

  render() {
    let { peer } = this.props;
    return (
      <div>
        <Button color="warning" size="sm" onClick={this.toggle}>
          Disconnect
        </Button>
        <Modal isOpen={this.state.open} toggle={this.toggle}>
          <ModalHeader>Disconnect from peer</ModalHeader>
          <ModalBody>
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
            <Button color="primary" onClick={this.disconnect}>
              Disconnect
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
