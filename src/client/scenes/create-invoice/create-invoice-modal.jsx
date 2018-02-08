import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { CreateInvoiceForm } from './components/create-invoice-form';
import { ModalAlert } from '../../components/modal-alert';
import { parseJson } from '../../services/rest-helpers';

export class CreateInvoiceModal extends React.Component {
  static propTypes = {
    onInvoiceCreated: PropTypes.func,
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
    this.createInvoice(this.state.form)
      .then(invoice => {
        if (this.props.onInvoiceCreated) this.props.onInvoiceCreated(invoice);
      })
      .then(this.toggle)
      .catch(error => this.setState({ error }));
  };

  createInvoice = ({ memo, value }) => {
    return fetch('/api/invoices', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ memo, value }),
    }).then(parseJson);
  };

  formChanged = form => {
    this.setState({ form });
  };

  render() {
    let valid = this.state.form && this.state.form.valid;
    let { open, error } = this.state;
    return (
      <div>
        <Button color="warning" size="sm" onClick={this.toggle}>
          New invoice
        </Button>
        <Modal isOpen={open} toggle={this.toggle}>
          <ModalHeader>Create invoice</ModalHeader>
          <ModalBody>
            <ModalAlert error={error} />
            <CreateInvoiceForm formChanged={this.formChanged} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.ok} disabled={!valid}>
              Create
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
