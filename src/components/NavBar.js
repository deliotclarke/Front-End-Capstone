import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class Example extends React.Component {

  logout = () => {
    this.props.onLogout();
    this.props.history.push('/login');
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
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" style={{ outline: "none" }} />
          <NavbarBrand href="/" style={{ color: '#F7F6F6' }}>resolute.</NavbarBrand>
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="/" style={{ color: '#F7F6F6' }}>home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => this.logout()} style={{ color: '#F7F6F6' }}>logout</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div >
    );
  }
}