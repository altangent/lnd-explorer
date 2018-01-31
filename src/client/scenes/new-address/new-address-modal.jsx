import React from 'React';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Hex } from '../../components/hex';

export class NewAddressModal extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
  };

  state = {
    open: false,
    address: null,
  };

  open = () => {
    this.newAddress({ type: this.props.type });
    this.setState({ open: true });
  };

  toggle = () => {
    this.setState({ open: !this.state.open });
  };

  newAddress = ({ type }) => {
    fetch('/api/address', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type }),
    })
      .then(res => res.json())
      .then(json => this.setState({ address: json.address.address }));
  };

  render() {
    return (
      <div>
        <Modal isOpen={this.state.open} toggle={this.toggle}>
          <ModalHeader>New {this.renderTypeString()} address</ModalHeader>
          <ModalBody>
            <p className="h6">
              <Hex value={this.state.address || ''} substrLength={64} />
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
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
