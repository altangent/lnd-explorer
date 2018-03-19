import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Hex } from '../../components/hex';

export class NewAddressModal extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
  };

  state = {
    address: null,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.open && !this.props.open) {
      this.newAddress({ type: nextProps.type });
    }
  }

  newAddress = ({ type }) => {
    fetch('/api/address', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type }),
      credentials: 'same-origin',
    })
      .then(res => res.json())
      .then(json => this.setState({ address: json.address.address }));
  };

  render() {
    return (
      <div>
        <Modal isOpen={this.props.open} toggle={this.props.toggle}>
          <ModalHeader>New {this.renderTypeString()} address</ModalHeader>
          <ModalBody>
            <p className="h6">
              <Hex value={this.state.address || ''} substrLength={64} />
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.props.toggle}>
              Ok
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  renderTypeString() {
    if (this.props.type === '0') return 'p2wkh';
    if (this.props.type === '1') return 'np2wkh';
    if (this.props.type === '2') return 'p2pkh';
  }
}
