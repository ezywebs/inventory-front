import React from "react"
import PropTypes from "prop-types"
import AllItems from "components/AllItems"
import NewCategory from "components/NewCategory"
import { handleResponse } from "helpers"
import Loading from "components/Loading"

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      loading: false,
      error: ''
    };
    
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  };
    
  componentDidMount() {
    this.setState({loading: true});
    
    fetch('/api/v1/categories.json')
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
    fetch("/api/v1/categories/" + id, {
      method: "DELETE"
    }).then(data => {
      this.removeCategory(id);
    });
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
        <NewCategory handleSubmit={this.handleAdd} />
        <AllItems categories={categories} handleDelete={this.handleDelete} />
      </div>
    );
  }
}

export default Body