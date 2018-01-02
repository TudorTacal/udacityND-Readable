import React, { Component } from "react";
import { Link } from "react-router-dom";

function CategoriesList(props) {
    return (
      <div className="categories">
        {props.categories.map(category => (
          <div key={category.path} className="category">
            <Link key={category.name} to={`/${category.path}`} className="btn btn-outline-secondary">
              {category.name}
            </Link>
          </div>
        ))}
      </div>
    );
}

export default CategoriesList;
