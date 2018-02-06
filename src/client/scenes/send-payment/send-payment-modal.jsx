import React from 'React';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { SendPaymentForm } from './components/send-payment-form';
import { ModalAlert } from '../../components/modal-alert';
import { parseJson } from '../../services/rest-helpers';

export class SendPaymentModal extends React.Component {
  static propTypes = {
    paymentSent: PropTypes.func,
  };

  state = {
    open: false,
    form: undefined,
    error: undefined,
  };

  toggle = () => {
    this.setState({ open: !this.state.open, error: undefined });
  };

  ok = () => {
    this.sendPayment(this.state.form)
      .then(this.toggle)
      .catch(error => this.setState({ error }));
  };

  sendPayment = ({ payment_request }) => {
    return fetch('/api/payment', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payment_request }),
    }).then(parseJson);
  };

  formChanged = form => {
    this.setState({ form });
  };

  render() {
    let valid = this.state.form && this.state.form.valid;
    let { error } = this.state;
    return (
      <div>
        <Button color="warning" size="sm" onClick={this.toggle}>
          Send payment
        </Button>
        <Modal isOpen={this.state.open} toggle={this.toggle}>
          <ModalHeader>Send payment</ModalHeader>
          <ModalBody>
            <ModalAlert error={error} />
            <SendPaymentForm formChanged={this.formChanged} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.ok} disabled={!valid}>
              Send
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
