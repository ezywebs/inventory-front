import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";
import Routes from "./Routes";
import AuthService from './components/AuthService';
import withAuth from './components/withAuth';
const Auth = new AuthService();

class App extends Component {
  
  handleLogout(){
    Auth.logout()
    this.props.history.replace('/login');
  }
  
  render() {
    // return (
    //   <div className="App container">
    //     <Navbar fluid collapseOnSelect>
    //       <Navbar.Header>
    //         <Navbar.Brand>
    //           <Link to="/">Scratch</Link>
    //         </Navbar.Brand>
    //         <Navbar.Toggle />
    //       </Navbar.Header>
    //       <Navbar.Collapse>
    //         <Nav pullRight>
    //           <LinkContainer to="/signup">
    //             <NavItem>Signup</NavItem>
    //           </LinkContainer>
    //           <LinkContainer to="/login">
    //             <NavItem>Login</NavItem>
    //           </LinkContainer>
    //         </Nav>
    //       </Navbar.Collapse>
    //     </Navbar>
    //     <Routes />
    //   </div>
    // );
    return(
      <div className="App">
        <div className="App-header">
          <h2>Welcome {this.props.user.username}</h2>
        </div>
        <p className="App-intro">
          <button type="button" className="form-submit" onClick={this.handleLogout.bind(this)}>Logout</button>
        </p>
      </div>
    );
  }
}

export default withAuth(App);