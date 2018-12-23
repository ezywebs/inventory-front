import React from "react"
import Loading from "components/Loading"

class NewCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      loading: false
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
    fetch("/api/v1/categories", {
      method: "POST",
      body: JSON.stringify({category: { name: name }}),
      headers: {
        'Content-Type': 'application/json'
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
      <div className="form-group row no-padding text-center">
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