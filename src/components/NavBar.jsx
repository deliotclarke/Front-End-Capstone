import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';


class NavBar extends React.Component {

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
                <NavLink tag={RRNavLink} to="/" style={{ color: '#F7F6F6' }} onClick={this.toggleNavbar} >how to</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to="/tasks/todo" style={{ color: '#F7F6F6' }} onClick={this.toggleNavbar} >tasks</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to="/timer" style={{ color: '#F7F6F6' }} onClick={this.toggleNavbar} >timer</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to="/profile" style={{ color: '#F7F6F6' }} onClick={this.toggleNavbar} >profile</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => this.props.onLogout()} style={{ color: '#F7F6F6' }} >logout</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div >
    );
  }
}

export default NavBar