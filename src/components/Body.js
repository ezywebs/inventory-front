import React, { Component } from "react";
import { Alert, Grid } from "react-bootstrap";
import AllItems from "./AllItems"
import NewCategory from "./NewCategory"
import { handleResponse, checkStatus } from "../helpers"
import Loading from "./common/Loading"
import {API_URL} from "../config";
import AuthService from './AuthService';
import withAuth from './withAuth';
const Auth = new AuthService();

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      loading: false,
      error: '',
      user: Auth.getProfile()
    };
    
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  };
    
  componentDidMount() {
    this.setState({loading: true});
    fetch(API_URL + "/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.state.user.token
        }
      })
      .then(handleResponse)
      .then(data => { 
        this.setState({ 
          categories: data,
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          error: error.errorMessage, 
          loading: false
        });
      });
  }

  handleAdd(newCategory) {
    this.setState((prevState) => (
    Object.assign(
      {}, 
      this.state, 
      { categories: [...prevState.categories, newCategory] }
    )
    ));
  }
 
  handleDelete(id) {
    this.setState({loading: true});
    fetch(API_URL + "/categories/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.state.user.token
        }
      })
      .then(res => { checkStatus(res) })
      .then(data => { 
        this.removeCategory(id);
      })
      .catch(error => {
        this.setState({
          error: error.errorMessage, 
          loading: false
        });
      });
    
    
    
    // fetch(url, {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": "Bearer " + this.state.user.token
    //   }
    // }).then(data => {
    //   this.removeCategory(id);
    // });
  }
  
  removeCategory(id) {
    let newCategories = this.state.categories.filter((category) => {
        return category.id != id;
    });
    this.setState({ categories: newCategories, loading: false });
  }

  render () {
    const { loading, categories, error} = this.state;
    if (loading) {
      return <div className="loading-container col-md-4 col-md-offset-4"><Loading /></div>
    }
    return (
      <div className="row">
        <Grid>
          { error && <Alert bsStyle="danger">Error!</Alert> } 
        </Grid>
        <NewCategory handleSubmit={this.handleAdd} />
        <AllItems categories={categories} handleDelete={this.handleDelete} />
      </div>
    );
  }
}

export default withAuth(Body);