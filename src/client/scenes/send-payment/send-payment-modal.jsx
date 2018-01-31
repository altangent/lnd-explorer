import React from 'React';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { SendPaymentForm } from './components/send-payment-form';

export class SendPaymentModal extends React.Component {
  static propTypes = {
    paymentSent: PropTypes.func,
  };

  state = {
    open: false,
    form: undefined,
  };

  toggle = () => {
    this.setState({ open: !this.state.open });
  };

  ok = () => {
    this.sendPayment(this.state.form).then(this.toggle);
  };

  sendPayment = ({ payment_request }) => {
    return fetch('/api/payment', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payment_request }),
    });
  };

  formChanged = form => {
    this.setState({ form });
  };

  render() {
    let valid = this.state.form && this.state.form.valid;
    return (
      <div>
        <Button color="warning" size="sm" onClick={this.toggle}>
          Send payment
        </Button>
        <Modal isOpen={this.state.open} toggle={this.toggle}>
          <ModalHeader>Send payment</ModalHeader>
          <ModalBody>
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
