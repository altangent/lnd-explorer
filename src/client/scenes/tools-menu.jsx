import React from 'React';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { NewAddressModal } from './new-address/new-address-modal';
import { SignMessageModal } from './sign-message/sign-message-modal';
import { VerifyMessageModal } from './verify-message/verify-message-modal';

export class ToolsMenu extends React.Component {
  static propTypes = {};

  state = {
    open: false,
  };

  toggle = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    return (
      <Dropdown isOpen={this.state.open} toggle={this.toggle} nav>
        <NewAddressModal type="0" ref={c => (this.p2wkhAddressModal = c)} />
        <NewAddressModal type="1" ref={c => (this.np2wkhAddressModal = c)} />
        <NewAddressModal type="2" ref={c => (this.p2pkhAddressModal = c)} />
        <SignMessageModal ref={c => (this.signMessageModal = c)} />
        <VerifyMessageModal ref={c => (this.VerifyMessageModal = c)} />
        <DropdownToggle nav caret>
          Tools
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => this.np2wkhAddressModal.open()}>
            New np2wkh address
          </DropdownItem>
          <DropdownItem onClick={() => this.p2wkhAddressModal.open()}>
            New p2wkh address
          </DropdownItem>
          <DropdownItem onClick={() => this.p2pkhAddressModal.open()}>
            New p2pkh address
          </DropdownItem>
          <DropdownItem onClick={() => this.signMessageModal.open()}>Sign message</DropdownItem>
          <DropdownItem onClick={() => this.VerifyMessageModal.open()}>Verify message</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
