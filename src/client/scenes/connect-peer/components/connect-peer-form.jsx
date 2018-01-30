import React from 'React';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input } from 'reactstrap';

export class ConnectPeerForm extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  state = {
    valid: false,
    pubkey: '',
    host: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) this.props.onChange(this.state);
  }

  formChanged = (key, value) => {
    let valid = this.validate({ ...this.state, [key]: value });
    this.setState({ [key]: value, valid });
  };

  validate = ({ pubkey, host }) => {
    return pubkey && host;
  };

  render() {
    let { pubkey, host } = this.state;
    return (
      <Form>
        <FormGroup>
          <Label for="connectPeerPubKey">Public key</Label>
          <Input
            type="string"
            id="connectPeerPubKey"
            value={pubkey}
            onChange={e => this.formChanged('pubkey', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="connectPeerHost">Host</Label>
          <Input
            type="string"
            id="connectPeerHost"
            value={host}
            onChange={e => this.formChanged('host', e.target.value)}
          />
        </FormGroup>
      </Form>
    );
  }
}
