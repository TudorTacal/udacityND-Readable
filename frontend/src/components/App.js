import React, { Component } from "react";
import { connect } from "react-redux";
import * as api from "../utils/readableApi";
import getPostsAsync from "../actions/getPosts";
import { fetchPosts } from "../utils/readableApi";

class App extends Component {
    componentDidMount() {
        this.props.getPosts()
    }
  render() {
    return (
      <div className="App">
        <div className="posts">
        <ul>
            {this.props.posts.map(post => (
                <li key={post.id} >
                    <h2>{post.title}</h2>
                    <h4>{post.body}</h4>
                    <p>Category: {post.category}</p>
                    <p>Votes: {post.voteScore}</p>
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
    posts: state.posts
  });
  return props;
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: () => {
      dispatch(getPostsAsync());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
