import React from "react"
import Loading from "components/Loading"

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      name: props.category.name,
      loading: false
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
  };

  updateCategory() {
    if (this.refs.name.value === this.state.name) {
      this.toggleEdit();
      return;
    }
    this.setState({ loading: true });
    let category = {id: this.props.category.id, name: this.refs.name.value};
    fetch("/api/v1/categories/" + category.id, {
      method: "PUT",
      body: JSON.stringify({category: { name: category.name }}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json();
    }).then(data => {
      this.setState({name: category.name, loading: false});
      this.toggleEdit();
    });
  }

  toggleEdit() {
    this.setState({editable: !this.state.editable});
  }
  
  render () {
    let name = this.state.editable ? <input type='text' defaultValue={this.state.name} className="form-control" ref='name'/> : <b><a onClick={this.toggleEdit} style={{cursor:'pointer'}}>{this.state.name}</a></b>;
    let editButton = this.state.editable ? <button onClick={this.updateCategory} className="btn btn-danger">Update</button> : <button onClick={this.toggleEdit} className="btn btn-danger">Edit</button>;
    let deleteButton = this.state.editable ? <button onClick={this.toggleEdit} className="btn btn-light">Cancel</button> : <button onClick={this.props.handleDelete.bind(this, this.props.category.id)} className="btn btn-primary">Delete</button>;

    if (this.state.loading) {
      return <div className="loading-container col-md-4 col-md-offset-4"><Loading /></div>
    }
    
    return(
      <tr>
        <td>
          {name}
        </td>
        <td>
          {editButton}
        </td>
        <td>
          {deleteButton}
        </td>
      </tr>
    )
  }
}

export default Category