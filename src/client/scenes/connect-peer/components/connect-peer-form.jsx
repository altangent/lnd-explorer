import React from 'React';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input } from 'reactstrap';

export class ConnectPeerForm extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    pubkey: PropTypes.string,
    host: PropTypes.string,
  };

  formChanged = (key, value) => {
    this.props.onChange(key, value);
  };

  render() {
    let { pubkey, host } = this.props;
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
