import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { Hex } from '../../components/hex';

export class SignMessageModal extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    messageSigned: PropTypes.func,
  };

  state = {
    msg: '',
    signedMessage: undefined,
    debounceTimeout: undefined,
  };

  signMessage = () => {
    let { msg } = this.state;
    if (msg.length < 2) return;

    fetch('/api/message/sign', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ msg }),
      credentials: 'same-origin',
    })
      .then(res => res.json())
      .then(json => this.setState({ signedMessage: json.signature, msg }));
  };

  formChanged = (prop, value) => {
    this.setState({ [prop]: value });
    this.debounceSignMessage();
  };

  debounceSignMessage = () => {
    clearTimeout(this.state.debounceTimeout);
    let timeout = setTimeout(this.signMessage, 250);
    this.setState({ debounceTimeout: timeout });
  };

  render() {
    return (
      <Modal isOpen={this.props.open} toggle={this.props.toggle}>
        <ModalHeader>Sign message</ModalHeader>
        <ModalBody>
          <div className="mb-3">
            <Form>
              <FormGroup>
                <Label>Input message:</Label>
                <Input
                  type="textarea"
                  value={this.state.msg}
                  onChange={e => this.formChanged('msg', e.target.value)}
                />
              </FormGroup>
            </Form>
          </div>
          {this.renderSignedMessage()}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.props.toggle}>
            Ok
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  renderSignedMessage() {
    let { msg, signedMessage } = this.state;
    if (!signedMessage || !msg) return '';
    return (
      <div>
        <div>Signed message:</div>
        <div className="h6">
          <Hex value={signedMessage} substrLength={56} />
        </div>
      </div>
    );
  }
}
