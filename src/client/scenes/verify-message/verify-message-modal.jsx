import React from 'React';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { Hex } from '../../components/hex';
import { BoolValue } from '../../components/bool-value';

export class VerifyMessageModal extends React.Component {
  static propTypes = {};

  state = {
    open: false,
    msg: '',
    signature: '',
    debounceTimeout: undefined,
    verification: undefined,
  };

  open = () => {
    this.toggle();
  };

  toggle = () => {
    this.setState({ open: !this.state.open });
  };

  verifyMessage = () => {
    let { msg, signature } = this.state;
    if (!msg || !signature) return;
    fetch('/api/message/verify', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ msg, signature }),
    })
      .then(res => res.json())
      .then(json => this.setState({ verification: json }));
  };

  formChanged = (prop, value) => {
    this.setState({ [prop]: value });
    this.debounceVerifyMessage();
  };

  debounceVerifyMessage = () => {
    clearTimeout(this.state.debounceTimeout);
    let timeout = setTimeout(this.verifyMessage, 300);
    setTimeout({ debounceTimeout: timeout });
  };

  render() {
    return (
      <Modal isOpen={this.state.open} toggle={this.toggle}>
        <ModalHeader>Verify message</ModalHeader>
        <ModalBody>
          <div className="row mb-3">
            <div className="col-sm-12">
              <FormGroup>
                <Label>Message</Label>
                <Input
                  type="textarea"
                  value={this.state.msg}
                  onChange={e => this.formChanged('msg', e.target.value)}
                />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <FormGroup>
                <Label>Signature</Label>
                <Input
                  type="textarea"
                  value={this.state.signature}
                  onChange={e => this.formChanged('signature', e.target.value)}
                />
              </FormGroup>
            </div>
          </div>
          {this.renderVerification()}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  renderVerification() {
    let { verification } = this.state;
    if (!verification) return '';
    return (
      <div>
        <div className="row">
          <div className="col-sm-3">Valid:</div>
          <div className="col-sm-9">
            <BoolValue value={verification.valid} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">Pub Key</div>
          <div className="col-sm-9">
            <Hex value={verification.pubkey} />
          </div>
        </div>
      </div>
    );
  }
}
