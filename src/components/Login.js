import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel, Alert, Grid, Row, Col } from "react-bootstrap";
import "./Login.css";
import { validateEmail, handleResponse } from "../helpers";
import {API_URL} from "../config";
import AuthService from './AuthService';
import Loading from "../components/common/Loading"

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      email_err: false,
      fail: false,
      loading: false
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
    this.setState({loading: true});
    const {email, password} = this.state;

    this.Auth.login(email,password)
      .then(res =>{
        this.props.history.replace('/');
      })
      .catch(err =>{
        this.setState({fail: true, loading: false})
      })
  }
  
  componentWillMount(){
    if(this.Auth.loggedIn())
      this.props.history.replace('/');
  }

  render() {
    if (this.state.loading) {
      return (
        <Grid style={{marginTop: "50px"}}>
          <Row>
            <Col md={2} mdOffset={5}>
              <Loading width={"50px"} height={"50px"} />
            </Col>
          </Row>
        </Grid>
      )
    }
    return (
      <div className="Login">
        <Grid>
          { this.state.fail && <Alert bsStyle="danger">Icorrect email or password</Alert> } 
        </Grid>
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