import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Input, Label } from 'reactstrap';

export class CreateInvoiceForm extends React.Component {
  static propTypes = {
    formChanged: PropTypes.func,
  };

  state = {
    valid: false,
    value: 0,
    memo: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) this.props.formChanged(this.state);
  }

  formChanged = (prop, value) => {
    let valid = this.validate({ ...this.state, [prop]: value });
    this.setState({ [prop]: value, valid });
  };

  validate = () => {
    return this.state.value > 0;
  };

  render() {
    let { value, memo } = this.state;
    return (
      <Form>
        <FormGroup>
          <Label for="newInvoiceAmount">Amount (sat)</Label>
          <Input
            type="number"
            id="newInvoiceAmount"
            value={value}
            onChange={e => this.formChanged('value', parseInt(e.target.value) || '')}
          />
        </FormGroup>
        <FormGroup>
          <Label for="newInvoiceMemo">Memo</Label>
          <Input
            type="textarea"
            id="newInvoiceMemo"
            value={memo}
            onChange={e => this.formChanged('memo', e.target.value)}
          />
        </FormGroup>
      </Form>
    );
  }
}
