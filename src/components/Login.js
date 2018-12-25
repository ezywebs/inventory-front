import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import { validateEmail, handleResponse } from "../helpers";
import {API_URL} from "../config";
import AuthService from './AuthService';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      email_err: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.Auth = new AuthService();
  }

  validateEmailField = (email) => {
    return validateEmail(email);
  }
  
  validateErrors = (email) => {
    if (!this.validateEmailField(email) && email !== "") {
      this.setState({
        email_err: true
      });
    }
    else {
      this.setState({
        email_err: false
      });
    }
  }

  validateForm = () => {
    return this.validateEmailField(this.state.email) && this.state.password.length > 0;
  }

  handleEmailChange = event => {
    this.handleChange(event);
    this.validateErrors(event.target.value);
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const {email, password} = this.state;
    
    // fetch(`${API_URL}/oauth/token`, {
    //     method: "POST",
    //     body: JSON.stringify({email: email, password: password, grant_type: "password"}),
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   })
    //   .then(handleResponse)
    //   .then(data => { 
    //     alert('success');
    //   })
    //   .catch(error => {
        
    //   });
      
    this.Auth.login(email,password)
      .then(res =>{
         this.props.history.replace('/');
      })
      .catch(err =>{
          alert(err);
      })
  }
  
  componentWillMount(){
    if(this.Auth.loggedIn())
      this.props.history.replace('/');
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large" className={this.state.email_err ? "has-error" : ""}>
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
            { 
              this.state.email !== "" 
              && <span className={this.state.email_err ? "glyphicon glyphicon-remove cross" : "glyphicon glyphicon-ok cross"} aria-hidden="true"></span>
            }
            <span className="help-block">{this.state.email_err ? "Please check your email and try again" : ""}</span>
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}