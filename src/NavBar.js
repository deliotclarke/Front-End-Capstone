import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { fontFamily } from './styles'

export default class Example extends React.Component {

  greenFont = {
    "color": "#3F7255"
  }

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    return (
      <div>
        <Navbar color="faded" style={{ backgroundColor: "#488C66" }} light>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <NavbarBrand href="/" style={{ color: '#F7F6F6' }}>resolute.</NavbarBrand>
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="/components/" style={{ color: '#F7F6F6' }}>GitHub</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap" style={{ color: '#F7F6F6' }}>GitHub</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div >
    );
  }
}