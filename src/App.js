import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { BrowserRouter as Router, Route, withRouter, Switch } from "react-router-dom";
import NotFound from "./components/common/NotFound";
import Login from "./components/Login";
import AuthService from './components/AuthService';
import withAuth from './components/withAuth';
const Auth = new AuthService();


class App extends Component {
  
  handleLogout(){
    Auth.logout()
    this.props.history.replace('/login');
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
              <NavItem>{this.props.user.username}</NavItem>
              <LinkContainer to="/login">
                <NavItem onClick={this.handleLogout.bind(this)}>Logout</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withAuth(App);