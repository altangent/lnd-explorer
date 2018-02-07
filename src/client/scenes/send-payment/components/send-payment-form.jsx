import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input } from 'reactstrap';

export class SendPaymentForm extends React.Component {
  static propTypes = {
    formChanged: PropTypes.func,
  };

  state = {
    valid: false,
    payment_request: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) this.props.formChanged(this.state);
  }

  fieldChanged = (prop, value) => {
    let valid = this.validate({ ...this.state, [prop]: value });
    this.setState({ [prop]: value, valid });
  };

  validate = ({ payment_request }) => {
    return !!payment_request;
  };

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="sendPaymentRequest">Payment request:</Label>
          <Input
            type="textarea"
            id="sendPaymentRequest"
            onChange={e => this.fieldChanged('payment_request', e.target.value)}
          />
        </FormGroup>
      </Form>
    );
  }
}
