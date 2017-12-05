import React, { Component } from "react";
import { connect } from "react-redux";
import * as api from "../utils/readableApi";
import getPostsAsync from "../actions/getPosts";
import getCategoriesAsync from "../actions/getCategories";
import { fetchPosts } from "../utils/readableApi";
import { Route, Router, Link, history, withRouter } from "react-router-dom";
import sortBy from "sort-by";

class App extends Component {
  componentDidMount() {
    this.props.getPosts();
    this.props.getCategories();
  }
  render() {
    let posts = this.props.posts;
    let categories = this.props.categories;
    return (
      <div className="App">

        <Route exact path="/" render={(history) => (
            <div>
              <div>
                Categories:
                {this.props.categories.map(category => (
                  <div key={category.path} className="categories">
                        <Link key={category.name} to={`/${category.path}`}>
                        {category.name}
                        </Link>
                  </div>
                ))}
              </div>
              <div className="posts">
                <ul>
                  Posts:
                  {posts.map(post => (
                    <li key={post.id}>
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
          )}/>

        {categories.map(category => (
            <Route key={category.name}
            path={`/${category.path}`}
            render={(history) => (
              <div>
                  {posts.filter(post => post.category === category.name).map(post => (
                      <div key={post.id}>
                        <h2>{post.title}</h2>
                        <h4>{post.body}</h4>
                        <p>Category: {post.category}</p>
                        <p>Votes: {post.voteScore}</p>
                        <p>Time: {new Date(post.timestamp).toGMTString()}</p>
                      </div>
                    ))}
              </div>
            )}
          />
        ))}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
