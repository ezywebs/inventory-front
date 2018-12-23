import React from "react"
import Category from "components/Category"

class AllItems extends React.Component {
  render () {
    let categories = this.props.categories.map((category) => {
      return (
        <Category category={category} handleDelete={this.props.handleDelete} key={category.id}/>
      )
    });

    return(
      <div className="col-md-6">
        <table className="table table-striped">
          <tbody>
            {categories}
          </tbody>
        </table>
      </div>
    )
  }
}

export default AllItems