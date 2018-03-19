import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { SendPaymentForm } from './components/send-payment-form';
import { ModalAlert } from '../../components/modal-alert';
import { parseJson } from '../../services/rest-helpers';
import { DecodedPaymentRequest } from './components/decoded-payment-request';

export class SendPaymentModal extends React.Component {
  static propTypes = {
    paymentSent: PropTypes.func,
  };

  state = {
    open: false,
    form: undefined,
    payreq: undefined,
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
      credentials: 'same-origin',
    }).then(parseJson);
  };

  decodeInvoice = ({ payment_request }) => {
    if (payment_request) {
      fetch('/api/payment/decode', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payment_request }),
        credentials: 'same-origin',
      })
        .then(parseJson)
        .then(payreq => this.setState({ payreq }))
        .catch(error => this.setState({ error }));
    }
  };

  formChanged = form => {
    this.setState({ form });
    this.decodeInvoice(form);
  };

  render() {
    let valid = this.state.form && this.state.form.valid;
    let { error } = this.state;
    return (
      <div>
        <Button color="primary" size="sm" onClick={this.toggle}>
          Send payment
        </Button>
        <Modal isOpen={this.state.open} toggle={this.toggle}>
          <ModalHeader>Send payment</ModalHeader>
          <ModalBody>
            <ModalAlert error={error} />
            <SendPaymentForm formChanged={this.formChanged} />
            <DecodedPaymentRequest payreq={this.state.payreq} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" size="sm" onClick={this.ok} disabled={!valid}>
              Send
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
