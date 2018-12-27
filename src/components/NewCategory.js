import React, { Component } from "react";
import Loading from "./common/Loading"
import {API_URL} from "../config";
import AuthService from './AuthService';
const Auth = new AuthService();

class NewCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      loading: false,
      user: Auth.getProfile()
    };
    this.handleClick = this.handleClick.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
  }

  onHandleChange() {
    this.setState({
      name: this.refs.name.value
    });
  }

  handleClick() {
    this.setState({loading: true});
    let name = this.refs.name.value;
    fetch(API_URL + "/categories", {
      method: "POST",
      body: JSON.stringify({category: { name: name }}),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.state.user.token
      }
    }).then(response => {
      return response.json();
    }).then(data => {
      this.props.handleSubmit(data);
      this.setState({name: '', loading: false});
    });
  }
  
  render () {
    if (this.state.loading) {
      return <div className="loading-container col-md-4 col-md-offset-4"><Loading /></div>
    }
    return (
      <div className="form-group row text-center">
        <div className="col-md-4">
          <input ref='name' placeholder='Enter category name' className="form-control" value={this.state.name} onChange={this.onHandleChange}/>
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary" onClick={this.handleClick}>New Category</button>
        </div>
      </div>
    );
  }
}

export default NewCategory