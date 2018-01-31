import React from 'React';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { CreateInvoiceForm } from './components/create-invoice-form';

export class CreateInvoiceModal extends React.Component {
  static propTypes = {
    invoiceCreated: PropTypes.func,
  };

  state = {
    open: false,
    form: undefined,
  };

  toggle = () => {
    this.setState({ open: !this.state.open });
  };

  ok = () => {
    this.createInvoice(this.state.form).then(this.toggle);
  };

  createInvoice = ({ memo, value }) => {
    return fetch('/api/invoices', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ memo, value }),
    });
  };

  formChanged = form => {
    this.setState({ form });
  };

  render() {
    let valid = this.state.form && this.state.form.valid;
    let { open } = this.state;
    return (
      <div>
        <Button color="warning" size="sm" onClick={this.toggle}>
          New invoice
        </Button>
        <Modal isOpen={open} toggle={this.toggle}>
          <ModalHeader>Create invoice</ModalHeader>
          <ModalBody>
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
