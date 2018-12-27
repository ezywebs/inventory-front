import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import AuthService from './AuthService';
const Auth = new AuthService();


class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }
  handleLogout(){
    Auth.logout()
    this.props.history.replace('/login');
  }
  componentDidUpdate() {
    if (!this.state.user && Auth.loggedIn()){
      this.setState({ user: Auth.getProfile() })
    }
  }
  render() {
    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Inventory</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/categories">
                <NavItem>Categories</NavItem>
              </LinkContainer>
            </Nav>
            <Nav pullRight>
            {
              this.state.user ? 
              <NavItem>{this.state.user.username}</NavItem> : 
              <LinkContainer to="/signup">
                <NavItem>Sign Up</NavItem>
              </LinkContainer>
            }
            {
              this.state.user ? 
              <LinkContainer to="/login">
                <NavItem onClick={this.handleLogout.bind(this)}>Log Out</NavItem>
              </LinkContainer> : 
              <LinkContainer to="/login">
                <NavItem>Log In</NavItem>
              </LinkContainer>
            }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;