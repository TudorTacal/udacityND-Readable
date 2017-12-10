import React, { Component } from "react";
import { Link } from "react-router-dom";

class CategoriesList extends React.Component {
  render() {
    return (
      <div className="categories">
        Categories:
        {this.props.categories.map(category => (
          <div key={category.path} className="category">
            <Link key={category.name} to={`/${category.path}`}>
              {category.name}
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default CategoriesList;
