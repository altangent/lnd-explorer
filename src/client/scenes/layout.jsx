import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link, Route } from 'react-router-dom';
import {
  Badge,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  NavbarBrand,
  Collapse,
  NavbarToggler,
} from 'reactstrap';

import { connect } from 'react-redux';
import { newTxs } from '../redux/selectors/tx-selectors';

import { HomeScene } from './home/home-scene';
import { TransactionsSceneWithData } from './transactions/transactions-scene';
import { PeersScene } from './peers/peers-scene';
import { ChannelsScene } from './channels/channels-scene';
import { InvoicesScene } from './invoices/invoices-scene';
import { PaymentsScene } from './payments/payments-scene';
import { NetworkScene } from './network/network-scene';
import { ToolsMenu } from './tools-menu';

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
        <Navbar className="main-navbar" light expand="md">
          <NavbarBrand tag={Link} to="/">
            &#x26A1; LND Explorer
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
                  Transactions&nbsp;
                  {this.renderTxBadge()}
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
              <ToolsMenu />
            </Nav>
          </Collapse>
        </Navbar>
        <div className="container-fluid mt-3">
          <Route exact path="/" component={HomeScene} />
          <Route path="/transactions" component={TransactionsSceneWithData} />
          <Route path="/peers" component={PeersScene} />
          <Route path="/channels" component={ChannelsScene} />
          <Route path="/invoices" component={InvoicesScene} />
          <Route path="/payments" component={PaymentsScene} />
          <Route path="/network" component={NetworkScene} />
        </div>
      </div>
    );
  }

  renderTxBadge() {
    let { newTxs } = this.props;
    if (newTxs.length)
      return (
        <Badge pill color="primary">
          {newTxs.length}
        </Badge>
      );
  }
}

Layout.propTypes = {
  newTxs: PropTypes.array,
};

export const LayoutWithData = withRouter(
  connect(state => ({
    newTxs: newTxs(state),
  }))(Layout)
);
