import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'

import MountainLogo from './white-mountains.png'


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
        <Navbar color="faded" style={{ backgroundColor: "#488C66", fontFamily: 'Roboto' }} light>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" style={{ outline: "none" }} />
          <NavbarBrand href="/" style={{ color: '#F7F6F6' }}><img src={MountainLogo} alt="Mountain Logo" style={{ height: "3.3rem", width: "auto", right: "6.5rem", top: ".08rem", position: "absolute", color: "black" }} />resolute.</NavbarBrand>
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink tag={RRNavLink} to="/" style={{ color: '#F7F6F6' }} onClick={this.toggleNavbar} >home</NavLink>
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