import React from 'react';
import { Nav, Navbar, NavItem, NavLink, NavbarBrand, Collapse, NavbarToggler } from 'reactstrap';
import { Link, Route } from 'react-router-dom';

import { HomeScene } from './scenes/home/home-scene';
import { TransactionsScene } from './scenes/transactions/transactions-scene';
import { PeersScene } from './scenes/peers/peers-scene';
import { ChannelsScene } from './scenes/channels/channels-scene';
import { InvoicesScene } from './scenes/invoices/invoices-scene';
import { PaymentsScene } from './scenes/payments/payments-scene';
import { NetworkScene } from './scenes/network/network-scene';

export class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand tag={Link} to="/">
            LND Explorer
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse navbar isOpen={this.state.isOpen}>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/">
                  Info
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/transactions">
                  Transactions
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/peers">
                  Peers
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/channels">
                  Channels
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/invoices">
                  Invoices
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/payments">
                  Payments
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/network">
                  Network
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <div className="container-fluid mt-3">
          <Route exact path="/" component={HomeScene} />
          <Route path="/transactions" component={TransactionsScene} />
          <Route path="/peers" component={PeersScene} />
          <Route path="/channels" component={ChannelsScene} />
          <Route path="/invoices" component={InvoicesScene} />
          <Route path="/payments" component={PaymentsScene} />
          <Route path="/network" component={NetworkScene} />
        </div>
      </div>
    );
  }
}
