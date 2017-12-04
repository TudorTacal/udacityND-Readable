import React, { Component } from "react";
import { connect } from "react-redux";
import * as api from "../utils/readableApi";
import getPostsAsync from "../actions/getPosts";
import getCategoriesAsync from "../actions/getCategories";
import { fetchPosts } from "../utils/readableApi";
import { Route, Router, Link, history } from "react-router-dom";
import sortBy from 'sort-by';


class App extends Component {
    componentDidMount() {
        this.props.getPosts()
        this.props.getCategories();
    }
  render() {
      let posts = this.props.posts;
    return (
      <div className="App">
      <div className="categories">Categories:
        {this.props.categories.map(category => (
                <Link key={category.name} to={`/${category.path}`}>{category.name}</Link>
        ))}
      </div>
        <div className="posts">
        <ul>Posts:
            {posts.map(post => (
                <li key={post.id} >
                    <h2>{post.title}</h2>
                    <h4>{post.body}</h4>
                    <p>Category: {post.category}</p>
                    <p>Votes: {post.voteScore}</p>
                    <p>Time: {new Date(post.timestamp).toGMTString()}</p>
                </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const props = Object.assign({}, state, {
    posts: state.posts.posts,
    categories: state.categories.categories
  });
  return props;
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: () => {
      dispatch(getPostsAsync());
    },
    getCategories: () => {
        dispatch(getCategoriesAsync());        
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
