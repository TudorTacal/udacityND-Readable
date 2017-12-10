import React, { Component } from "react";
import { Link } from "react-router-dom";

function CategoriesList(props) {
    return (
      <div className="categories">
        Categories:
        {props.categories.map(category => (
          <div key={category.path} className="category">
            <Link key={category.name} to={`/${category.path}`}>
              {category.name}
            </Link>
          </div>
        ))}
      </div>
    );
}

export default CategoriesList;
