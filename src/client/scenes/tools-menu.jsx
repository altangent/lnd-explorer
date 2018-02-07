import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { NewAddressModal } from './new-address/new-address-modal';
import { SignMessageModal } from './sign-message/sign-message-modal';
import { VerifyMessageModal } from './verify-message/verify-message-modal';

export class ToolsMenu extends React.Component {
  static propTypes = {};

  state = {
    open: false,
    nestedWitnessAddressModal: false,
    witnessAddressModal: false,
    pubkeyAddressModal: false,
    signModal: false,
    verifyModal: false,
  };

  toggle = () => {
    this.setState({ open: !this.state.open });
  };

  toggleNestedWitnessAddressModal = () => {
    this.setState({ nestedWitnessAddressModal: !this.state.nestedWitnessAddressModal });
  };

  toggleWitnessAddressModal = () => {
    this.setState({ witnessAddressModal: !this.state.witnessAddressModal });
  };

  togglePubkeyAddressModal = () => {
    this.setState({ pubkeyAddressModal: !this.state.pubkeyAddressModal });
  };

  toggleSignModal = () => {
    this.setState({ signModal: !this.state.signModal });
  };

  toggleVerifyModal = () => {
    this.setState({ verifyModal: !this.state.verifyModal });
  };

  render() {
    return (
      <Dropdown isOpen={this.state.open} toggle={this.toggle} nav>
        <NewAddressModal
          type="0"
          open={this.state.witnessAddressModal}
          toggle={this.toggleWitnessAddressModal}
        />
        <NewAddressModal
          type="1"
          open={this.state.nestedWitnessAddressModal}
          toggle={this.toggleNestedWitnessAddressModal}
        />
        <NewAddressModal
          type="2"
          open={this.state.pubkeyAddressModal}
          toggle={this.togglePubkeyAddressModal}
        />
        <SignMessageModal open={this.state.signModal} toggle={this.toggleSignModal} />
        <VerifyMessageModal open={this.state.verifyModal} toggle={this.toggleVerifyModal} />
        <DropdownToggle nav caret>
          Tools
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={this.toggleNestedWitnessAddressModal}>
            New np2wkh address
          </DropdownItem>
          <DropdownItem onClick={this.toggleWitnessAddressModal}>New p2wkh address</DropdownItem>
          <DropdownItem onClick={this.togglePubkeyAddressModal}>New p2pkh address</DropdownItem>
          <DropdownItem onClick={this.toggleSignModal}>Sign message</DropdownItem>
          <DropdownItem onClick={this.toggleVerifyModal}>Verify message</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
